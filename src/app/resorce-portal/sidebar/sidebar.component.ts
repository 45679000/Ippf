import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  activeStatus: boolean = false;
  activeSdp: boolean = false;
  activeMap: boolean = false;
  activeAdmin: boolean = false;
  activeDash: boolean = true;
  displayResourceLinks: boolean = false;
  displaySdpLinks: boolean = false;
  displayMapLinks: boolean = false;
  displayAdminLinks: boolean = false;
  displayFooter: boolean =false;
  displayResource(){
    this.displayResourceLinks = !this.displayResourceLinks; 
    this.activeStatus = !this.activeStatus;
  }
  displaySdp(){
    this.displaySdpLinks = !this.displaySdpLinks; 
    this.activeSdp = !this.activeSdp;
  }
  displayMap(){
    this.displayMapLinks = !this.displayMapLinks; 
    this.activeMap = !this.activeMap;
  }
  displayAdmin(){
    this.displayAdminLinks = !this.displayAdminLinks; 
    this.activeAdmin = !this.activeAdmin;
  }
  
}
