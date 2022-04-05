import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { Router, NavigationEnd,NavigationStart,  Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WishPortal';
  constructor(route: ActivatedRoute, private auth: AuthServiceService, private router: Router) { 
    
    const user = route.data.subscribe(data => {
      console.log(data);
    });
    // console.log(route)
    
  }

  ngOnInit(): void {
    console.log(this.router.events);
    
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            // console.log(event.url);
            // event.url == '/datasets' || event.url == '/datasets/datasetdetails' || event.url == '/datasets/datasetdetails/datasetrequest' || event.url == '/home'
            if(event.url == '/datasets' || event.url == '/datasets/datasetdetails' || event.url == '/datasets/datasetdetails/datasetrequest' || event.url == '/home' || event.url == '/'){
              this.footerDisp = true;
              this.headerDisp  = true;
            }
          }
        });
  }
  displayHeader: boolean = true;
  displayFooter: boolean =true;
  footerDisp: boolean= false;
  headerDisp: boolean = false;
}
