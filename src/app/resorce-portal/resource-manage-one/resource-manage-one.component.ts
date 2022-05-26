import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-manage-one',
  templateUrl: './resource-manage-one.component.html',
  styleUrls: ['./resource-manage-one.component.css']
})
export class ResourceManageOneComponent implements OnInit {

  activeStatus: boolean = false;
  toggleBtn(){
    this.activeStatus = !this.activeStatus
  }
  constructor() { }

  ngOnInit(): void {
  }

}
