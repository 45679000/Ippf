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
    user: new FormControl('', [Validators.required]),
    realm: new FormControl('localsql', [Validators.required])
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
      this.auth.changePassword(this.passwordResetForm.value).subscribe((response:any) => {
        console.log(response);
        if(response == 500 || 0){
          this.load = false
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',  
            footer: 'Try again. If problems persist contact the admin'  
          })
        } else if(response == 400) {
          this.load = false
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Email or username mismatch',  
            footer: 'Make sure you have entered the rigth credentials. However, if problems persist, contact the admin.'  
          })
        } else {
          this.load = false
          if(response.status){
            setTimeout(function (){
              Swal.fire({  
                icon: 'success',  
                title: 'Done',  
                text: 'You have been sent an email to reset your password. ',  
                footer: 'Check your email inbox. Then sign in.'  
              })
            }, 2000)
            this.route.navigate(['/login'])
          }
        }
      })
    }else {
      this.warn = "Make sure to fill all the required form field before submiting"
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Username and email address are required',
      })
    }
  }
}
