import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  isShown: boolean = true ; // hidden by default
  warn:string = ''
  load:boolean = false
  passwordResetForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('',[Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  })
  emailSent() {
    this.isShown = !this.isShown
  }

  constructor(private auth: AuthServiceService, private route: Router) { }

  ngOnInit(): void {
  }
  changePassword() {
    if(this.passwordResetForm.status == 'VALID'){
      this.load = true
      this.auth.changePassword().subscribe((response:any) => {
        console.log(response);
        if(response == 500){
          this.load = false
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',  
            footer: 'Try again. If problems persist contact the admin'  
          })
        } else if(response == 401) {
          this.load = false
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Password did not match',  
            footer: 'Try again.'  
          })
        } else {
          this.load = false
          setTimeout(function (){
            Swal.fire({  
              icon: 'success',  
              title: 'Done',  
              text: 'Your password was changed',  
              footer: 'You redirecting to login page'  
            })
          }, 1000)
          this.route.navigate(['/login'])
        }
      })
    }else {
      this.warn = "Make sure to fill all the required form field before submiting"
    }
  }
}
