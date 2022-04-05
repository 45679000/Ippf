import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'

@Component({
  selector: 'app-resorce-portal',
  templateUrl: './resorce-portal.component.html',
  styleUrls: ['./resorce-portal.component.css']
})
export class ResorcePortalComponent implements OnInit {

  @ViewChild( MatSidenav ) sidebar!: MatSidenav
  sidebarOpened: boolean = false
  sidebarMode: any
  constructor( private screenObserver: BreakpointObserver ) { }
  ngOnInit(): void{}

  ngAfterViewInit() {
    this.screenObserver.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
      
      if(state.matches){
        this.sidebar.mode = 'over';
        this.sidebarMode = 'over'
        this.sidebar.close();
        this.sidebarOpened = false
        console.log('width < 800px');
        
      } else {
        this.sidebar.mode = 'side';
        this.sidebarMode = 'side'
        this.sidebar.open();
        this.sidebarOpened = true
        console.log('width > 800px');
      }
    })
  }

}
