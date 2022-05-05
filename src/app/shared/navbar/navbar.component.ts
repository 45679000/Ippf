import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,NavigationStart,  Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  public href: string = "";

  ngOnInit(): void {
    this.href = this.router.url
    // this.router.events
    //   .subscribe(
    //     (event: NavigationEvent) => {
    //       console.log(event);

    //       if(event instanceof NavigationStart) {
            // console.log(event.url);
            if(this.href == '/about' || this.href == '/faqs' || this.href == '/contact' || this.href == '/account-settings'){
              this.fontColorBlue = false;
            } else {
              this.fontColorBlue = true              
            }
        //   }
        // });
  }
  fontColorBlue: boolean = true

}
