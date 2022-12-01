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
  root_url:string = Constants.dataverse_url
  dataset_id:number = 0
  dataFile:any = {}
  file_type:string = ""
  label:string = ""
  constructor(private http: HttpClient) {
  }
  allDatasets = new Observable<Data>((observer) => {
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url: this.root_url+'/search?q=*&type=dataset&per_page=1000',
      success: function (response){
        observer.next(response.result)
        
      },
      error: function(error){
        console.log(error)
      }
    })
  });
  getAllData(): any{
    // this.trySth().subscribe((e:any) => {
    //   console.log(e);
      
    // })
    const allDatas = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url:  this.root_url+'/search?q=*&type=dataset&per_page=20&metadata_fields=ippf:meta_identification',
        success: function (response){
          observer.next(response.data)
        }
      })
      
    });
    return allDatas
  }
  requestDataset(id: number, reason:string, country:string, organisation:string):any{
    let token = localStorage.getItem('id')
    // http://$SERVER/api/access/datafile/{id}/requestAccess
      const formData=new FormData();
    formData.append("reason",reason);
    // formData.append("country",country);
    // formData.append("organisation",organisation);
    const allDatas = new Observable((observer) => {
      $.ajax({
        method: "PUT",
        // contentType:'application/json',
        headers: {
          "X-Dataverse-key": token
        },
        data: formData,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,

        // dataType: 'jsonp',
        url:  this.root_url+'/access/datafile/'+id+'/requestAccess',
        success: function (response){
          // console.log(response)
          observer.next(response)
        },error: function(res){
          // console.log(res)
          observer.next(res)
        }
      })
      
    });
    return allDatas
  }
  getRequestedData(){
    let user_id = localStorage.getItem('id')
    const data = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url: this.root_url+"/v1/mydata/retrieve?selected_page=1&dvobject_types=DataFile&published_states=Published&published_states=Unpublished&published_states=Draft&published_states=In+Review&published_states=Deaccessioned&role_ids=1&role_ids=2&role_ids=6&key="+user_id,
        success: function (response){
          console.log(response)
          let res = response.data
          observer.next(res)
        }
      })
      
    });
    return data
  }
  getADataset(id: string): any{
    const aDataset = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url: this.root_url+"/datasets/:persistentId/?persistentId="+id,
        success: function (response){
          // console.log(response
          let res = response.data
          observer.next(res)
        }
      })
      
    });
    return aDataset
  }
  getMetaData(id:string){
    // 2012044
    // ippf
    const meta = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url: this.root_url+`/datasets/${id}/versions/1.0/metadata/ippf`,
        success: function (response){
          // console.log(response)
          observer.next(response.data)
        }
      })
    })
    return meta
  }
  getDataDesc(id:string){
    // 2012044
    let url = this.root_url
    const meta = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url: this.root_url+`/datasets/${id}/versions/1.0/metadata/v1_datasetdesc`,
        success: function (response){
          // console.log(response)
          observer.next(response.data)
        },
        error: function(err){
          $.ajax({
            method: "GET",
            contentType:'application/json',
            // dataType: 'jsonp',
            url: url+`/datasets/${id}/versions/1.0/metadata/datasetdesc`,
            success: function (response){
              console.log(response)
              observer.next(response.data)
            }
          })
        }
      })
    })
    
    return meta
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
        contentType:'application/json',
        // dataType: 'jsonp',
        url: `${this.root_url}/search?q=*&type=dataverse`,
        success: function (response){
          console.log('dsd')
          console.log(response);
          
          observer.next(response.data.items)
        }
      })
      
    });
    return tags
  }
  searchDataset(q: string, tag: string, group: string,sort:any = 0, per_page:number = 0): any{
    // let url = 
    let data:string = ""
    let sort_string: string = ""
    if(tag != null && q != null){
      data = "q="+q +"fq="+tag
        // q: q,
        // fq: tag
    }else if(tag != null){
      data = "fq="+tag
    }else if (q != null){
      data = "q="+q
    }
    console.log(sort)
    if(sort.length > 0){
      sort_string = "&sort="+sort[0]+"&order="+sort[1]
    }
    // return this.http.jsonp(`${this.baseURL}/package_search?${data}`, 'callback')
    const allDatas = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url:  `${this.root_url}/search?q=${q.length > 0? q: '*'}&type=dataset${sort_string}&start=0&per_page=${per_page=0 ? 100 : per_page}&metadata_fields=ippf:meta_identification`,
        success: function (response){
          
          observer.next(response.data.items)
        }
      })
      
    });
    return allDatas
   
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
  trySth():any{
    const dataset = new Observable((observer) => {
      $.ajax({
        method: "GET",
        headers: {
          "X-Dataverse-key": "a62e870b-9f08-405f-949b-ab46bccb504c"
        },
        // Authorization: ,
        // data: form_data,
        // url: 'http://192.168.1.212:8080/api/access/dataset/:persistentId/?persistentId=doi:10.5072/FK2/JK2TPG',
        url: 'http://192.168.1.212:8080/api/access/datafile/persistentId=doi:10.5072/FK2/JK2TPG&format=prep',
        success: function (response){
          console.log(response);
          
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
  getWishScope(){
    const meta = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'application/json',
        // dataType: 'jsonp',
        url: this.root_url+`/search?q=wishscope`,
        success: function (response){
          // console.log(response)
          observer.next(response.data)
        }
      })
    })
    return meta
  }
}
 