import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  isShown: boolean = true ; // hidden by default
  
  emailSent() {
    this.isShown = !this.isShown
  }

  constructor() { }

  ngOnInit(): void {
  }

}
