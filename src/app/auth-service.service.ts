import { Injectable } from '@angular/core';
import { User } from './user';
import { newUser } from './newUser';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private route: Router, private http: HttpClient) { }
  footerDisp: boolean= false;
  headerDisp: boolean = false;
  accountCreated: boolean = false;
  username: string = '';
  isLoggedIn (){
    return !!localStorage.getItem('token');
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  login(email: string, password:string, remember: boolean){
    
    // this.http.post<any>('http://localhost/bookPos/api/booksApi.php', JSON.stringify({email: email, password: password, remember: remember})).subscribe((res: any) =>{
      // console.log(res);
      
    // })
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    this.route.navigate(['/']);

  }
  createNewUser(name: string, email: string, country: string, accountType: string, password: string): Observable<any>{
    this.accountCreated = true
    this.username = `Account successfully created for ${name}`
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({
      name: name,
      email: email,
      country: country,
      account: accountType,
      password: password
    })
    return this.http.post('http://localhost:3000/users', body, {'headers':headers, observe: 'response'})
    // this.route.navigate(['login'])
  }
  // login(){
  //   return this.http
  //     .post<any>(`${this.endpoint}/signin`, user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token);
  //       this.getUserProfile(res._id).subscribe((res) => {
  //         this.currentUser = res;
  //         this.router.navigate(['user-profile/' + res.msg._id]);
  //       });
  //     });
  // }
  // getUserProfile(id: any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res || {};
  //     }),
  //     catchError(this.handleError)
  //   );
  // }
}
