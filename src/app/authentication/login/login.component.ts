import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';


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
  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: Router, private _location: Location) {}
  ngOnInit(): void {
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
          if(token == 500){
            this.error = ''
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Something went wrong!',  
              footer: 'Try again. If problems persist contact the admin'  
            })
            this.load = false
          }else if(token == 401) {
              this.load = false
              this.error = "Wrong credentials"
              Swal.fire({  
                icon: 'error',  
                title: 'Oops...',  
                text: 'Wrong credentials'
              })
          }else if(token.result.status){
            this.error = ''
            this.load = false
            Swal.fire({  
              icon: 'success',  
              title: 'Done',  
              text: 'Logged in successfully',  
              footer: "Redirecting..."  
            });
            
            this._location.back();
          } else {
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Something went wrong!',  
              footer: 'Try again. If problems persist contact the admin'  
            })
            this.load = false
          }
          
        })
    }
    
  }
  get email(){
    return this.loginForm.get('email')
    }
  
  get password(){
  return this.loginForm.get('password')
  }

}
