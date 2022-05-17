import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }
  isShown: boolean = false ; // hidden by default


  toggleShow() {
    this.isShown = !this.isShown;
  }
  ngOnInit(): void {
  }

}
