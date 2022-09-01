import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { Router, NavigationEnd,NavigationStart,  Event as NavigationEvent } from '@angular/router';
import { RoutesService } from './services/routes.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WishPortal';
  constructor(route: ActivatedRoute, private auth: AuthServiceService, private router: Router, private routesService: RoutesService) { 
    
  }
  public href: string = "";

  ngOnInit(): void {
    this.routesService.changePrevious('home')
    this.href = this.router.url
    if(this.href == '/account-settings'){
      this.footerDisp = false
      this.headerDisp = false
    } 
    
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            // event.url == '/datasets' || event.url == '/datasets/datasetdetails' || event.url == '/datasets/datasetdetails/datasetrequest' || event.url == '/home'
            if(event.url == '/datasets' || event.url == '/datasets/datasetdetails' || event.url == '/datasets/datasetdetails/datasetrequest' || event.url == '/home' || event.url == '/' || event.url == '/about' || event.url == '/faqs' || event.url == '/contact'){
              this.footerDisp = true;
              this.headerDisp  = true;
            }else if(event.url == '/login' || event.url == '/register' || event.url == '/change-password' || event.url == '/account-settings'){
              this.footerDisp = false
              this.headerDisp = false
            }
          }
        });
  }
  displayHeader: boolean = true;
  displayFooter: boolean =true;
  footerDisp: boolean= false;
  headerDisp: boolean = false;
}
