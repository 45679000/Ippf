import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShown: boolean = false ; // hidden by default


  toggleShow() {
    this.isShown = !this.isShown;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
