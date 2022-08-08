import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Token } from './interfaces/Token'
import { Constants } from './config/constants'

const jwt = new JwtHelperService();
class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  auth_url:string = Constants.AUTH_ENDPOINT

  private decodedToken: any;
  constructor( private route: Router, private http: HttpClient) {
    this.decodedToken = localStorage.getItem('auth_meta') || null;
   }
  footerDisp: boolean= false;
  headerDisp: boolean = false;
  accountCreated: boolean = false;
  username: string = '';
  isLoggedIn (){
    return !!localStorage.getItem('token');
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  login(email: string, password:string, remember: boolean){
    const token = new Observable((observer) => {
      $.ajax({
        method: "POST",
        data: {
          username: email,
          password: password
        },
        url:`${this.auth_url}/auth`,
        success: function (response){
          console.log(response)
          // this.saveToken(response.result.value.token)
          this.decodedToken = jwt.decodeToken(response.result.value.token);
          localStorage.setItem('auth_tkn', response.result.value.token);
          localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
          observer.next(response)
          // this.route.navigate(['/']);
          // observer.next(response.status)
        },
        error: function (error){
          // console.log(error)
          observer.next(error.status)
        }
      });
    });
    return token
  }
  saveToken(token: any): Observable<any>{
    console.log('yeah');
    
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
  signup(username:string, givenname: string,surname:string, email:string, password:string){
    let data = {
        username: username,
        givenname: givenname,
        surname: surname,
        email: email,
        password: password
      }
    const newUSer = new Observable((observer) => {
      $.ajax({
        method: "POST",
        data: data,
        url:`${this.auth_url}/register`,
        success: function (response){
          console.log(response)
          observer.next(response)
        },
        error: function (error){
          console.log(error)
          if(error.status == 400){
            let response = error.responseJSON.result
            observer.next(response)
          }else {
            observer.next(error.status)
          }
        }
      });
    });
    return newUSer
  }
  logout() {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = null;
    this.route.navigate(['/login'])
  }
  public isAuthenticated(): any {
    // console.log(localStorage.getItem('auth_meta'));
    if(localStorage.getItem('auth_meta') != null){
      this.decodedToken = localStorage.getItem('auth_meta') 
      
      return moment().isBefore(moment.unix(JSON.parse(this.decodedToken).exp));
    }else {
      return false
    }
  }
  getUser(): Token {
    return JSON.parse(this.decodedToken);
  }
  getUserDetails(): any {
    let token = localStorage.getItem('auth_tkn')
    const userDetails = new Observable((observer) => {
      $.ajax({
        method: "GET", 
        headers: {
          "Authorization": localStorage.getItem('auth_tkn')
        },
        url:`${this.auth_url}/user`,
        success: function (response){
          console.log(response)
          observer.next(response.result)
        },
        error: function (error){
          console.log(error)
          observer.next(error.status)
        }
      });
    });
    return userDetails 

  }
  changePassword(): any {
    let token = localStorage.getItem('auth_tkn')

    const userReset = new Observable((observer) => {
      $.ajax({
        method: "POST", 
        // headers: {
        //   "Authorization": localStorage.getItem('auth_tkn')
        // },
        url:`https://privacyidea.netknights.it/dariangroup/user/`,
        success: function (response){
          console.log(response)
          observer.next(response.result)
        },
        error: function (error){
          console.log(error)
          observer.next(error.status)
        }
      });
    });
    return userReset 

  }
  updateUser(givenname:string, email:String): any {
    let token = localStorage.getItem('auth_tkn')
    let data = {
      givenname: givenname,
      email: email
    }
    const userReset = new Observable((observer) => {
      $.ajax({
        method: "PUT", 
        data: JSON.stringify(data),
        headers: {
          "Authorization": localStorage.getItem('auth_tkn')
        },
        url:`${this.auth_url}/user/`,
        success: function (response){
          console.log(response)
          observer.next(response.result)
        },
        error: function (error){
          console.log(error)
          observer.next(error.status)
        }
      });
    });
    return userReset 
  }
}
