import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import * as $ from "jquery";
import {} from '../interfaces/groups'

import { Dataset } from '../interfaces/dataset';
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
 
  baseURL: string = "https://api.github.com/";
  datasetsAr = []
 
  constructor(private http: HttpClient) {
  }
  allDatasets = new Observable<Data>((observer) => {
    // console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/package_list',
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
        url:`http://44.204.72.194/api/3/action/package_list`,
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
        url:`http://44.204.72.194/api/3/action/package_show?id=${id}`,
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
        url:`http://44.204.72.194/api/3/action/group_list`,
        success: function (response){
          // console.log(response)
          observer.next(response.result)
        }
      })
      
    });
    return groups
  }

}
 