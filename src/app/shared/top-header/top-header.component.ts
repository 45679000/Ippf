import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service'
import { Token } from '../../interfaces/Token'

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor(private route: Router, private authService: AuthServiceService) { }
  isSignedIn: boolean = false ; // hidden by default
  salutation: string = 'Hi'
  isShowProfile: boolean = false
  user:Token = {
    username: '',
    realm: '',
    nonce: '',
    role: '',
    authtype: '',
    exp: 0,
    rights: []
  }

  takeMeHome(){
    this.route.navigate(['/']);

  }
  ngOnInit(): void {
    this.isSignedIn = this.authService.isAuthenticated()
    
    if(this.isSignedIn){
      this.user = this.authService.getUser()
    }
  }
  signOut() {
    this.authService.logout()

  }
  showProfile(){
    this.isShowProfile = !this.isShowProfile
  }
}
