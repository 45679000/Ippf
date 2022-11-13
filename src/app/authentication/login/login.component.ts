import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import { RoutesService } from '../../services/routes.service'
// import * as login_dataverse from '../../../assets/js/login.js'
declare const fun:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup
  
  loginForm: any;
  accountCreated = this.auth.accountCreated
  username = this.auth.username;
  error: string = ''
  success: string = ''
  load:boolean  = false
  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: Router, private _location: Location, private routesService: RoutesService) {}
  ngOnInit(): void {
    // $.getScript('./assets/js/login.js');
    console.log(this.routesService.previousUrl)
    if(this.auth.isAuthenticated()){
      this.route.navigate(['/'])
    }
    this.loginForm = this.fb.group({
      email: ['',  [Validators.required, ]],
      password: ['',  [Validators.required]],
      remember: [true]
    });
    // this.auth.signup()
    
  }
  login() {
    if(this.loginForm.valid){
      this.load = true
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.remember).subscribe((token: any) => {   
        console.log(token);
        fun(this.loginForm.value.email, this.loginForm.value.password)
        if(!token.success){
          this.error = ''
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: token.message,  
            // footer: 'Try again. If problems persist contact the admin'  
          })
          this.load = false
        }else{
          this.load = false
          
          // if(this.routesService.previousUrl == 'registration' || this.routesService.previousUrl == 'password-change'){
          //   this.routesService.changePrevious('home')
            this.route.navigate(['/'])
          // } else {  
          //   this.routesService.changePrevious('home')          
          //   this._location.back();
          // }
        }
        
      })
      // fun(this.loginForm.value.email, this.loginForm.value.password)
      // .subscribe((e:any)=>{
      //   console.log(e);
        
      // })
    }
    
  }
  get email(){
    return this.loginForm.get('email')
    }
  
  get password(){
  return this.loginForm.get('password')
  }

}
