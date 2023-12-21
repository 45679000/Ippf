import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
    baseURL: string = Constants.dataverse_url;

  constructor(private http: HttpClient) {
    
   }
   sendFeedBack(country:string, message:string, method:string):any{
    let subject = ""
    if(method == "feedback"){
      subject = "Feedback"
    }else{
      subject = "Contact Us"
    }
    let country_text = country + ":\n"
    const body = { "subject": subject,"email": "wish2action@ippf.org", "body": country_text+ "  " + message };
    return this.http.post<any>(this.baseURL+'/users/support', body)

  }
  getFaqs(){
    return this.http.get(this.baseURL+'/faqs')
  }
  getAbout(){
    return this.http.get(this.baseURL+'/contact')
  }
  getPrivacyPolicy(){
    return this.http.get(this.baseURL+"/termsandcondition")
  }
}
