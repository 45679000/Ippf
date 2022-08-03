import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import * as $ from "jquery";
import {} from '../interfaces/groups'

import { Dataset } from '../interfaces/dataset';
import { Callbacks } from 'jquery';
interface Data {
  help: string,
  result: string[],
  success: boolean
}
interface richDataset {
  result: string[];
}
interface dataDaset {
  author: string
  author_email: string
  creator_user_id: string
  extras: Array<string>
  groups: Array<string>
  id: string
  isopen: boolean
  license_id: string
  license_title: string
  maintainer: string
  maintainer_email: string
  metadata_created: string
  metadata_modified: string
  name: string
  notes: string
  num_resources: number
  num_tags: number
  organization: object
  owner_org: string
  private: boolean
  relationships_as_object: Array<string>
  relationships_as_subject: Array<string>
  resources: Array<string>,
  state: string
  tags: object
  title: string
  type: string
  url: string
  version: string

}
interface Country {
  name: string,
  Slug:any,
  Country: string
}
interface CountryStatus{
  Slug:any,
  Date: string,
  Confirmed: number,
  Recovered: number,
  Deaths: number
}
@Injectable({
  providedIn: 'root'
})
export class DatasetService {
 
  baseURL: string = "http://3.236.19.31/api/3/action";
  datasetsAr = []
  covidData = "http://3.236.19.31/dataset/234e5493-8490-40b9-9037-d7640b5dd8f5/resource/b655af33-c738-469f-bae5-4fca1f860cbe/download/test.csv";

  BASE_URL:string = `https://api.covid19api.com/`;
  COVID_URL = {
    COUNTRIES: `${this.BASE_URL}countries`,
    BY_COUNTRY: (country: string) => `${this.BASE_URL}dayone/country/${country}`,
}

  constructor(private http: HttpClient) {
  }
  getCountries$ = this.http.get<Country[]>(this.COVID_URL.COUNTRIES);
  getCasesByCountry = (countrySlug: string) => {
    return this.http.get<CountryStatus[]>(`${this.COVID_URL.BY_COUNTRY(countrySlug)}`)
  }
  allDatasets = new Observable<Data>((observer) => {
    // console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url: 'http://3.236.19.31/api/3/action/package_list',
      success: function (response){
        observer.next(response.result)
        console.log(response);
        
      },
      error: function(error){
        console.log(error)
      }
    })
  });
  getAllData(): any{
    const allDatas = new Observable((observer) => {
      $.ajax({
        method: "GET",
        // contentType:'application/json',
        dataType: 'jsonp',
        url:  this.baseURL +'/package_list',
        success: function (response){
          // console.log(response)
          response.result.forEach((el: any) =>{
            $.ajax({
              method: "GET",
              // contentType:'application/json',
              dataType: 'jsonp',
              url:`http://3.236.19.31/api/3/action/package_show?id=${el}`,
              success: function (response){
                // console.log(response)
                observer.next(response.result)
              }
            })
          })
        }
      })
      
    });
    return allDatas
  }
  getADataset(id: string): any{
    const aDataset = new Observable((observer) => {
      $.ajax({
        method: "GET",
        // contentType:'application/json',
        dataType: 'jsonp',
        url:this.baseURL + `/package_show?id=${id}`,
        success: function (response){
          // console.log(response)
          observer.next(response.result)
        }
      })
      
    });
    return aDataset
  }
  getAllGroups(): any{
    const groups = new Observable((observer) => {
      $.ajax({
        method: "GET",
        // contentType:'application/json',
        dataType: 'jsonp',
        url:this.baseURL + `/group_list`,
        success: function (response){
          // console.log(response)
          observer.next(response.result)
        }
      })
      
    });
    return groups
  }
  getAllTags(): any{
    const groups = new Observable((observer) => {
      $.ajax({
        method: "GET",
        // contentType:'application/json',
        dataType: 'jsonp',
        url:this.baseURL + `/tag_list`,
        success: function (response){
          // console.log(response)
          observer.next(response.result)
        }
      })
      
    });
    return groups
  }
  searchDataset(q: string, tag: string, group: string): any{
    let url = this.baseURL + '/package_search?'
    let data:string = ""
    if(tag != null && q != null){
      data = "q="+q +"fq="+tag
        // q: q,
        // fq: tag
    }else if(tag != null){
      data = "fq="+tag
    }else if (q != null){
      data = "q="+q
    }
    return this.http.jsonp(`http://3.236.19.31/api/3/action/package_search?${data}`, 'callback')
   
  }
  viewCsv(csv_link: string): any{
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    const groups = new Observable((observer) => {
      // $.ajax({
      //   method: "GET",
      //   // contentType:'application/json',
      //   // dataType: 'json',
      //   data: {
      //     username: 'admin',
      //     password: 'AndyDCG*&9'
      //   },
      //   url:`https://100.27.24.95/auth`,
      //   success: function (response){
      //     console.log(response)
      //     observer.next(response)
      //   }
      // })
      // return this.http.get(`https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/b53c9e72-6b59-4cda-8c0c-7d6a51dad12a/download/sample.csv`)
      var settings = {
        // "url": "https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/9ce6650b-6ff0-4a52-9b10-09cfc29bbd7e/download/co2-mm-mlo_csv.csv",
        // "url": "https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/b53c9e72-6b59-4cda-8c0c-7d6a51dad12a/download/sample.csv",
        "url": csv_link,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        // console.log(response);
        observer.next(response)
      });
      // $.ajax({
      //   method: "POST",
      //   // contentType:'application/json',
      //   dataType: 'jsonp',
      //   url: 'https://100.27.24.95/auth?username=admin&password=AndyDCG*%269',
      //   success: function (response){
      //     console.log(response)
      //     observer.next(response.result)
      //   }
      // })
      // console.log('yees')
      // $.get(this.covidData, function(data){
      //   console.log('yees'+data)
      //   observer.next(data)
      // })
      
    });
    return groups
    // return this.http.jsonp(this.covidData, 'text')
  }
  getAnotherCsv(csv_link: string): any{
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    const groups = new Observable((observer) => {
      $.ajax({
        method: "POST",
        // contentType:'application/json',
        // dataType: 'json',
        data: {
          username: 'admin',
          password: 'AndyDCG*&9'
        },
        url:`https://100.27.24.95/auth`,
        success: function (response){
          console.log(response)
          observer.next(response)
        }
      });
      
    });
    return groups
    // return this.http.jsonp(this.covidData, 'text')
  }
  addDataset(form_data:any):any{
    // let data = {
    //   "name": "direction",
    //   "title": "Directory",
    //   "tags": [{"name":"hospitals"}, {"name":"directory"}],
    //   "notes":"List of Hospitals, including facility name, city, and license number",
    //   "private":"False",
    //   "author":"joe blogger",
    //   "author_email":"joe.blogger@state.gov",
    //   "maintainer":"joe blogger",
    //   "maintainer_email":"joe.blogger@state.gov",
    //   "license_id":"gfdl",
    //   "owner_org": "ippf",
    //   // "resources": [
    //   //   resource
    //   // ]
    // }
    const dataset = new Observable((observer) => {
      $.ajax({
        method: "POST",
        // contentType:'application/json',
        // dataType: 'json',
        headers: {
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJXMVZPZlBoQmJCLUs4UHZQOGFzMkwzZTVaY0V1WEU4UzduTTlZVU5wSEFrZWp2WlEyMlROaGZqeEdOdFFEV3RfakFNVHhsVEhKMi1RUk9RYSIsImlhdCI6MTY1OTQyNzQyMX0.9A8PdXV931bZT91kfWxDEUK4qrXi5VFjKbyWo9Nb0r8"
        },
        // Authorization: ,
        data: form_data,
        url:`http://3.236.19.31/api/3/action/package_create`,
        success: function (response){
          console.log(response)
          observer.next(response)
        }
      });
      
    });
    return dataset
  }
  addResource(resource_form:any):any{
    // let data = {
    // "package_id": "16ee5358-c017-4a71-a7ea-d1438dee64fa",
    // // "url": "https://raw.githubusercontent.com/frictionlessdata/test-data/master/files/csv/100kb.csv",
    // "description": "blah lah",
    // "format":"csv",
    // // "hash": "",
    // "state": "active",
    // "name": "test_to",
    // // "resource_id": "80938932-325c-4dbc-9dc6-1a3e676dd87a",
    // "force": true,
    // // "mimetype": "",
    // // "mimetype_inner": "",
    // // "cache_url": "",
    // // "size": "",
    // // "created": "",
    // // "last_modified": "",
    // // "cache_last_updated": "",
    // "upload": file

    // }
    const dataset = new Observable((observer) => {
      $.ajax({
        method: "POST",
        // contentType:'application/json',
        // dataType: 'json',
        headers: {
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJXMVZPZlBoQmJCLUs4UHZQOGFzMkwzZTVaY0V1WEU4UzduTTlZVU5wSEFrZWp2WlEyMlROaGZqeEdOdFFEV3RfakFNVHhsVEhKMi1RUk9RYSIsImlhdCI6MTY1OTQyNzQyMX0.9A8PdXV931bZT91kfWxDEUK4qrXi5VFjKbyWo9Nb0r8"
        },
        // Authorization: ,
        data: resource_form,
        url:`http://3.236.19.31/api/3/action/resource_create`,
        success: function (response){
          console.log(response)
          observer.next(response)
        }
      });
      
    });
    return dataset
  }
  createViews(): any{
      let data = {
        "resource_id": "80938932-325c-4dbc-9dc6-1a3e676dd87a",
        "title": "true",
        "view_type": "recline_view"
      }
      const dataset = new Observable((observer) => {
        $.ajax({
          method: "POST",
          // contentType:'application/json',
          // dataType: 'json',
          headers: {
            "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJXMVZPZlBoQmJCLUs4UHZQOGFzMkwzZTVaY0V1WEU4UzduTTlZVU5wSEFrZWp2WlEyMlROaGZqeEdOdFFEV3RfakFNVHhsVEhKMi1RUk9RYSIsImlhdCI6MTY1OTQyNzQyMX0.9A8PdXV931bZT91kfWxDEUK4qrXi5VFjKbyWo9Nb0r8"
          },
          // Authorization: ,
          data: JSON.stringify(data),
          url:`http://3.236.19.31/api/3/action/resource_view_create`,
          success: function (response){
            console.log(response)
            observer.next(response)
          }
        });
        
      });
      return dataset
  }
}
 