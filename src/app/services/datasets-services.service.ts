import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import * as $ from "jquery";
import {} from '../interfaces/groups'

import { Dataset } from '../interfaces/dataset';
import { Callbacks } from 'jquery';
import { Constants } from '../config/constants'

interface Data {
  help: string,
  result: string[],
  success: boolean
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
 
  baseURL: string = Constants.CKAN_ENDPOINT;
  datasetsAr = []

  constructor(private http: HttpClient) {
  }
  allDatasets = new Observable<Data>((observer) => {
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url: this.baseURL +'/package_list',
      success: function (response){
        observer.next(response.result)
        
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
          let url = this.baseURL
          response.result.forEach((el: any) =>{
            $.ajax({
              method: "GET",
              // contentType:'application/json',
              dataType: 'jsonp',
              url: `http://54.157.112.194/api/3/action/package_show?id=${el}`,
              success: function (response){
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
        url: this.baseURL + `/package_show?id=${id}`,
        success: function (response){
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
          observer.next(response.result)
        }
      })
      
    });
    return groups
  }
  getAllTags(): any{
    const tags = new Observable((observer) => {
      $.ajax({
        method: "GET",
        // contentType:'application/json',
        dataType: 'jsonp',
        url:this.baseURL + `/tag_list`,
        success: function (response){
          observer.next(response.result)
        }
      })
      
    });
    return tags
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
    return this.http.jsonp(`${this.baseURL}/package_search?${data}`, 'callback')
   
  }
  viewCsv(csv_link: string): any{
    const groups = new Observable((observer) => {
      var settings = {
        "url": csv_link,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        observer.next(response)
      });
    });
    return groups
  }
  addDataset(form_data:any):any{
    const dataset = new Observable((observer) => {
      $.ajax({
        method: "POST",
        headers: {
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJXMVZPZlBoQmJCLUs4UHZQOGFzMkwzZTVaY0V1WEU4UzduTTlZVU5wSEFrZWp2WlEyMlROaGZqeEdOdFFEV3RfakFNVHhsVEhKMi1RUk9RYSIsImlhdCI6MTY1OTQyNzQyMX0.9A8PdXV931bZT91kfWxDEUK4qrXi5VFjKbyWo9Nb0r8"
        },
        // Authorization: ,
        data: form_data,
        url:`${this.baseURL}/package_create`,
        success: function (response){
          observer.next(response)
        }
      });
      
    });
    return dataset
  }
  updateDataset(form_data:any,id:any):any{
    let data = form_data
    form_data.id = id
    const dataset = new Observable((observer) => {
      $.ajax({
        method: "POST",
        headers: {
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJXMVZPZlBoQmJCLUs4UHZQOGFzMkwzZTVaY0V1WEU4UzduTTlZVU5wSEFrZWp2WlEyMlROaGZqeEdOdFFEV3RfakFNVHhsVEhKMi1RUk9RYSIsImlhdCI6MTY1OTQyNzQyMX0.9A8PdXV931bZT91kfWxDEUK4qrXi5VFjKbyWo9Nb0r8"
        },
        // Authorization: ,
        data: form_data,
        url:`${this.baseURL}/package_update`,
        success: function (response){
          observer.next(response)
        },
        error: function (error){
          observer.next(error.status)
        }
      });
      
    });
    return dataset
  }
  addResource(resource_form:any):any{
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
        url:`${this.baseURL}/resource_create`,
        success: function (response){
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
          url:`${this.baseURL}/resource_view_create`,
          success: function (response){
            observer.next(response)
          }
        });
        
      });
      return dataset
  }
}
 