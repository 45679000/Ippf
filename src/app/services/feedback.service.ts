import { Injectable } from '@angular/core';
import * as $ from "jquery";
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {
    
   }
   sendFeedBack(country:string, message:string, method:string):any{
    let subject = ""
    if(method == "feedback"){
      subject = "Feedback"
    }else{
      subject = "Contact Us"
    }
    return this.http.get(`https://production.techsavanna.technology/melvins_db_backup/send_mail.php?subject=${subject}&to=kkip762@gmail.com&body=${country}  ${message}`);

  }
}
