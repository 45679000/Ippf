import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(route: ActivatedRoute, auth: AuthServiceService) { 
    // auth.footerDisp = false
    const user = route.data.subscribe(data => {
      // this.product=data;
      // console.log(data);
      
    });
    // console.log(auth.footerDisp);

  }
  
  // footerDisp: boolean= false;
  // headerDisp: boolean = true;
  ngOnInit(): void {
  }

}
