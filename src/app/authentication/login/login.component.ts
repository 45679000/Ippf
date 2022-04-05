import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 import { AuthServiceService } from '../../auth-service.service';



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
  constructor(private fb: FormBuilder, private auth: AuthServiceService) {}

  // contactForm = new FormGroup({
  //   firstname: new FormControl(),
  //   lastname: new FormControl(),
  //   email: new FormControl(),
  //   gender: new FormControl(),
  //   isMarried: new FormControl(),
  //   country: new FormControl()
  // })
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',  [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',  [Validators.required]],
      remember: [true]
    });
  }
  login() {
    if(this.loginForm.valid){
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.remember)
        
    }
    
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  }
  get email(){
    return this.loginForm.get('email')
    }
  
  get password(){
  return this.loginForm.get('password')
  }

}
