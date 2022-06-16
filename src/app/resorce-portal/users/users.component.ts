import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  activeStatus: boolean = false;
  toggleBtn(){
    this.activeStatus = !this.activeStatus
  }

  constructor() { }

  ngOnInit(): void {
  }

}
