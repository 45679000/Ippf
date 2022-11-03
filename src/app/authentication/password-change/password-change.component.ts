import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service'

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
    email: new FormControl('',[Validators.required, , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    realm: new FormControl('localsql', [Validators.required])
  })
  emailSent() {
    this.isShown = !this.isShown
  }

  constructor(private auth: AuthServiceService, private route: Router, private routesService: RoutesService) { }

  ngOnInit(): void {
  }
  changePassword() {
    if(this.passwordResetForm.value.email){
      this.load = true
      this.auth.changePassword(this.passwordResetForm.value.email,"").subscribe((response:any) => {
        console.log(response);
        if(response.success){
          this.load = false
          // if(response.status){
            setTimeout(function (){
              Swal.fire({  
                icon: 'success',  
                title: 'Done',  
                text: 'You have been sent an email to reset your password. ',  
                footer: 'Check your email inbox. Then sign in.'  
              })
            }, 2000)
            this.routesService.changePrevious('password-change')
            this.route.navigate(['/login'])
        }else{
          this.load = false
          Swal.fire({  
            icon: 'error',  
            title: 'Failed',  
            text: "Make sure to input email address used to register",  
            // footer: 'Check your email inbox. Then sign in.'  
          })
        }
      })
    }else {
      this.warn = "Make sure to fill all the required form field before submiting"
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Email address is required',
      })
    }
  }
}
