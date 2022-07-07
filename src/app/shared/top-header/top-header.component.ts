import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service'

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor(private route: Router, private authService: AuthServiceService) { }
  isSignedIn: boolean = false ; // hidden by default

  takeMeHome(){
    this.route.navigate(['/']);

  }
  ngOnInit(): void {
    this.isSignedIn = this.authService.isLoggedIn()
  }
  signOut() {
    localStorage.removeItem('token')
    this.route.navigate(['/login']);

  }
}
