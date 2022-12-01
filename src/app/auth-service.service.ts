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
      var settings = {
        "url": this.auth_url+"/Account/Loginapi",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
          "username": email,
          "password": password
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        let date = new Date()
        let save = date.toJSON()
        if(response.email != null){
          if(response.emailConfirmed){
            localStorage.setItem('email', response.email);
            localStorage.setItem('id', response.id);
            localStorage.setItem('name', response.firstName);
            localStorage.setItem("middleName", response.middleName),
            localStorage.setItem("otherNames",response.otherNames),
            // "isEnabled": true,
            // "emailConfirmed": false,
            localStorage.setItem("staffLevel",response.staffLevel),
            localStorage.setItem("staffPosition",response.Accountant),
            localStorage.setItem("staffPartner",response.testpartner)
            localStorage.setItem("time", save)
            observer.next( {
              "success": true,
              "message": response.firstName
            })
          }else{
            observer.next({
              "success": false,
              "message": "Kindly complete the process of registration by confirming your email address."
            })
          }
        }else if(!response.succeeded){
          observer.next({
            "success": false,
            "message": "Password or email incorrect"
          })
        }

      }).fail(function(response) {
        observer.next({
          "success": false,
          "message": "There was a problem, try again"
        })
      });
    });
       return token
  }
  checkConfirmation(emailConfirmed: boolean){
    if(emailConfirmed){
      return true
    }else{
      return false
    }
  }
  saveToken(token: any): Observable<any>{    
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
  signup(firstName: string,OtherNames:string, email:string, password:string, country:string, organization:string){
    let data = {
      }
    const newUSer = new Observable((observer) => {
      var settings = {
        "url": `${this.auth_url}/Account/RegisterApi`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "FirstName": firstName,
          "OtherNames": OtherNames,
          "Email": email,
          "Password": password,
          "MobileContact": "111111",
          "Country": country,
          "Organisation": organization
        }
      };
      
      $.ajax(settings).done(function (response) {
        observer.next({
          succces: true,
          message: response
        })
      }).fail(function(error) {
        observer.next({
          success: false,
          message: error.responseJSON ?error.responseJSON[0] : "There was an error in network, if the problems persist, contact the system admin"
        })
      })
    });
    return newUSer
  }
  get_to_day(){
    let date = new Date()
    date.setHours(date.getHours()+1)
    return date
    // .getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
  }
  diff_hours(dt2:any, dt1:any) 
  {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

  }
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.route.navigate(['/login'])
  }
  public isAuthenticated(): any {
    let day = new Date()
    let dt2 = new Date(localStorage.getItem('time'))
    let diff = this.diff_hours(day, dt2)
    if(localStorage.getItem('id') != null){
      if(diff > 0){
        this.logout();
        return false;
      }else{
        return true
      }
    } else {
      return false
    }
  }
  getUser(): Token {
    return JSON.parse(this.decodedToken);
  }
  getUserDetails(): any {
    let token = localStorage.getItem('auth_tkn')
    const userDetails = new Observable((observer) => {
      let user_id= localStorage.getItem('id') 
      var settings = {
        "url": `${this.auth_url}/Account/user/${user_id}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        // console.log(response)
        observer.next({
          "success":true,
          "data":response
        })
      }).fail(function(response) {
        observer.next({
          "success": false,
          "message": "There was a problem, try again"
        })
      });
    })
    return userDetails 

  }
  changePassword(email:any, password:any): any {
    let data = {
      email : email,
      user : email
    }
    const userReset = new Observable((observer) => {
    var settings = {
      "url": this.auth_url+"/Account/ForgotPasswordApi",
      "method": "POST",
      "timeout": 0,
      "mimeType": "multipart/form-data",
      "data": {
        "email": email,
        // "password": password
      }
    };

    $.ajax(settings).done(function (response) {
      observer.next({success:true,message:response});
    }).fail(function(err){
      observer.next({success: false,
        message:err})
    })
  });
    return userReset 

  }
  updateUser(firstName:string,otherNames:string, email:string, country:string, organisation:string): any {
    const userReset = new Observable((observer) => {
      let user_id = localStorage.getItem('id');
      var settings = {
        "url": `${this.auth_url}/api/users/updateuser/${user_id}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "FirstName": firstName,
          "OtherNames": otherNames,
          "Email":  localStorage.getItem('email'),
          // "Password": "Peter1313&24",
          "MobileContact": "1111",
          "Country": country,
          "Organisation": organisation,
          "StaffLevel": localStorage.getItem('staffLevel'),
          "StaffPartner": localStorage.getItem('staffPartner'),
          "MiddleName": localStorage.getItem("middleName"),
          "EmailVerified": "true",
          "StaffPosition": localStorage.getItem('staffPosition'),
        }
      };
      $.ajax(settings).done(function (response) {
        observer.next({success:true,message:response.result})
      }).fail(function(err){
        observer.next({success:false,message:err})
      })
    });
    return userReset 
  }
}
