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
        if(response.email != null){
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
          observer.next( {
            "success": true,
            "message": response.firstName
          })
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
   
    // return this.http.post("http://192.168.1.212:8080/login.xhtml", {
    //   "credentials": "include",
    //   "headers": {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //   },
    
    //   "body": "j_idt4=j_idt4&j_idt4%3Aj_idt6=dataverseAdmin&j_idt4%3Aj_idt7=admin123&j_idt4%3Apopdistancecalc=Submit&javax.faces.ViewState=stateless",
    //   "method": "POST",
    //   "mode": "cors"
    // });
    return token
  }
  saveToken(token: any): Observable<any>{    
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
  signup(firstName: string,OtherNames:string, email:string, password:string){
    let data = {
        // username: email,
        // givenname: givenname,
        // surname: surname,
        // email: email,
        // password: password
      }
    const newUSer = new Observable((observer) => {
      var settings = {
        "url": `${this.auth_url}/api/users/register`,
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
          "MobileContact": "111111"
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
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.route.navigate(['/login'])
  }
  public isAuthenticated(): any {
    if(localStorage.getItem('id') != null){
      return true
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
      let user_id= localStorage.getItem('id') 
      var settings = {
        "url": `${this.auth_url}/Account/user/${user_id}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response)
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
        
    // var form = new FormData();
    // form.append("email", "iankips17@gmail.com");
    // form.append("password", "Test12");

    var settings = {
      "url": "http://52.87.191.19:5007/Account/ForgotPasswordApi",
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
  updateUser(firstName:string,otherNames:string, email:String): any {
    const userReset = new Observable((observer) => {
      let user_id = localStorage.getItem('id');
      var settings = {
        "url": `${this.auth_url}/api/users/updateregister/${user_id}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "firstName": firstName,
          "middleName": localStorage.getItem("middleName"),
          "otherNames": otherNames,
          "staffLevel": localStorage.getItem('staffLevel'),
          "staffPosition": localStorage.getItem('staffPosition'),
          "staffPartner": localStorage.getItem('staffPartner'),
          "userName": localStorage.getItem('email'),
          "email": localStorage.getItem('email'),
          // "emailConfirmed": "false",
          "MobileContact": "111111",
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        observer.next({success:true,message:response.result})
      }).fail(function(err){
        console.log(err)
        observer.next({success:false,message:err})
      })
    });
    return userReset 
  }
}
