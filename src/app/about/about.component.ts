import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    about:any = ""
    privacyPolicy:any = ""
    display:number = 1
  constructor(private feed: FeedbackService, private route: Router) { }

  ngOnInit(): void {
    this.feed.getAbout().subscribe((res:any) => {
      this.about = res.data
    })
    if(this.route.url == "/privacy-policy"){
      this.feed.getPrivacyPolicy().subscribe((res:any) => {
        this.privacyPolicy = res.data
      })
      this.display = 2
    }else if(this.route.url == '/terms-and-conditions'){
      this.display = 3
    }else{
      this.display = 1
    }
  }

}
