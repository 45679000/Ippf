import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,NavigationStart,  Event as NavigationEvent } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private screenObserver: BreakpointObserver) { }
  public href: string = "";
  breadCrumb: boolean = false
  ngOnInit(): void {
    this.href = this.router.url
    if(this.href == '/about' || this.href == '/faqs' || this.href == '/contact' || this.href == '/account-settings' || this.href == '/datasets' || this.href == '/datasets/dataset-request' || '/datasets/dataset-details'){
      this.fontColorBlue = true;
    } else {
      this.fontColorBlue = false              
    }
    if(this.href == '/home'){{
      this.fontColorBlue = false              
    }}
    console.log(this.href)
  }
  fontColorBlue: boolean = true
  ngAfterViewInit() {
    this.screenObserver.observe(['(max-width: 768px)']).subscribe((state: BreakpointState) => {
      
      if(state.matches){
        this.breadCrumb = true
        console.log('width < 768px');
        
      } else {
        this.breadCrumb = false
        console.log('width > 768px');
      }
    })
  }

}
