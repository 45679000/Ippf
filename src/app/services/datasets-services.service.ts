import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import * as $ from "jquery";

import { Dataset } from '../interfaces/dataset';
 
@Injectable({
  providedIn: 'root'
})
export class DatasetService {
 
  baseURL: string = "https://api.github.com/";
  datasetsAr = []
 
  constructor(private http: HttpClient) {
  }
 
  getDatasets() {
    $.ajax({
      method: "GET",
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/package_list',
      success: function (response){
        return response;
      }
    })
    // return this.datasetsAr
  }
}
 