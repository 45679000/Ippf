import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service'
import { User } from '../../interfaces/UserDetails';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  load:boolean = false
  error:string =''
  result:any
  isShown: boolean = true ; // hidden by default
  warn:string = ''
  user: User ={
    editable: false,
    email: "",
    givenname: "",
    id: 0,
    password: "",
    resolver: "",
    userid: 0,
    username: ""
  }
  accountDetailsForm = new FormGroup({
    username: new FormControl(this.user.username),
    givenname: new FormControl(this.user.givenname,[Validators.required]),
    email: new FormControl(this.user.email,[Validators.required]),
    password: new FormControl(''),
  })
  passwordResetForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    realm: new FormControl('localsql', [Validators.required])
  })
  constructor(private auth: AuthServiceService, private routesService: RoutesService, private route: Router) { }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe((item:any) => {
      
      if(item == 500 || item == 0){
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: 'Reload the page. If problems persist contact the admin'  
        })
      } else {
        if(item.status == true) {
          this.user = item.result
          console.log(item);
          
        }
      }
    })

  }
  updateUser(){
    if(this.accountDetailsForm.status == 'VALID') {
      this.auth.updateUser(this.accountDetailsForm.value.givenname, this.accountDetailsForm.value.email).subscribe((response: any) => {
        if(response == 500){
          this.error = ''
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',  
            footer: 'Try again. If problems persist contact the admin'  
          })
          this.load = false
        }else if(response == 401) {
            this.load = false
            this.error = "Wrong credentials"
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Make sure you are authenticated'
            })
        }else if(response.result.status){
          this.error = ''
          this.load = false
          setTimeout(() => {
            Swal.fire({  
              icon: 'success',  
              title: 'Done',  
              text: 'Details changed successfully',  
              footer: "Reloading..."  
            });
          }, 1000);
          
          
          // this._location.back();
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
  changePassword() {
    if(this.passwordResetForm.value.password == this.passwordResetForm.value.confirm_password){
      if(this.passwordResetForm.value.email){
        this.load = true
        this.auth.changePassword(this.passwordResetForm.value.email).subscribe((response:any) => {
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
              this.routesService.changePrevious('password-change')
              this.route.navigate(['/login'])
            }
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
    }else {
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Passwords did not match'
      })
    }
    
  }
}
