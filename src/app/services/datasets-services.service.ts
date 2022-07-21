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
@Injectable({
  providedIn: 'root'
})
export class DatasetService {
 
  baseURL: string = "http://44.204.72.194/api/3/action";
  datasetsAr = []
  covidData = "http://44.204.72.194/dataset/234e5493-8490-40b9-9037-d7640b5dd8f5/resource/b655af33-c738-469f-bae5-4fca1f860cbe/download/test.csv";
  constructor(private http: HttpClient) {
  }
  allDatasets = new Observable<Data>((observer) => {
    // console.log('Starting observable');
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
          // console.log(response)
          response.result.forEach((el: any) =>{
            $.ajax({
              method: "GET",
              // contentType:'application/json',
              dataType: 'jsonp',
              url:`http://44.204.72.194/api/3/action/package_show?id=${el}`,
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
    return this.http.jsonp(`http://44.204.72.194/api/3/action/package_search?${data}`, 'callback')
   
  }
  viewCsv(csv_link: string): any{
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    const groups = new Observable((observer) => {
      $.ajax({
        method: "GET",
        contentType:'text/csv',
        // dataType: 'jsonp',
        url: this.covidData,
        success: function (response){
          console.log(response)
          observer.next(response.result)
        }
      })
      // console.log('yees')
      // $.get(this.covidData, function(data){
      //   console.log('yees'+data)
      //   observer.next(data)
      // })
      
    });
    return groups
    // return this.http.jsonp(this.covidData, 'text')
  }

}
 