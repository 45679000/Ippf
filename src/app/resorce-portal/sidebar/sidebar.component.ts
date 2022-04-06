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
    this.activeStatus = !this.activeStatus;
    this.displayResourceLinks = !this.displayResourceLinks;  
    this.displaySdpLinks = false;
    this.displayMapLinks = false;
    this.displayAdminLinks = false;
    this.activeDash = !this.activeDash;
  }
  displaySdp(){
    this.activeSdp = !this.activeSdp;
    this.displaySdpLinks= !this.displaySdpLinks;  
    this.displayResourceLinks = false;
    this.displayMapLinks = false;
    this.displayAdminLinks = false;
    this.activeDash = !this.activeDash;
  }
  displayMap(){
    this.activeMap = !this.activeMap;
    this.displayMapLinks= !this.displayMapLinks;  
    this.displayResourceLinks = false;
    this.displaySdpLinks = false;
    this.displayAdminLinks = false;
    this.activeDash = !this.activeDash;
  }
  displayAdmin(){
    this.activeAdmin = !this.activeAdmin;
    this.displayAdminLinks= !this.displayAdminLinks;  
    this.displayResourceLinks = false;
    this.displaySdpLinks = false;
    this.displayMapLinks = false;
    this.activeDash = !this.activeDash;
  }
  
}
