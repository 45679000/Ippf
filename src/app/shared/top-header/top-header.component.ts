import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor(private route: Router) { }
  isShown: boolean = false ; // hidden by default


  toggleShow() {
    // this.isShown = !this.isShown;
    if(this.isShown == true) {
      this.isShown = false
    }
  }
  mouseOverShow() {
    // if(this.isShown == false){
      this.isShown = true
    // }
  }
  takeMeHome(){
    this.route.navigate(['/']);

  }
  ngOnInit(): void {
  }

}
