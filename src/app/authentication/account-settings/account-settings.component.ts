import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service'
import { DatasetService } from '../../services/datasets-services.service';
import { User } from '../../interfaces/UserDetails';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service'
// import { group } from 'console';
import { Constants } from '../../config/constants'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  base_url: string = Constants.dataverse_url
  load:boolean = false
  load_two:boolean = true
  error:string =''
  result:any
  isShown: boolean = true ; // hidden by default
  warn:string = ''
  user: User ={
    editable: false,
    email: "",
    givenname: "",
    firstName: "",
    otherNames:'',
    id: 0,
    password: "",
    resolver: "",
    userid: 0,
    username: "",
    country:"",
    organisation:""
  }
  mydata:any []= []
  accountDetailsForm :any;
  passwordResetForm :any
  constructor(private auth: AuthServiceService, private routesService: RoutesService, private route: Router, private fb: FormBuilder, private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe((item:any) => {
      this.datasetService.getRequestedData().subscribe((e:any)=>{
        this.load_two = false
        this.mydata = e.items
        console.log(this.mydata)
      })
      if(item.success){
        let user_det = item.data
        console.log(user_det);
        this.user.id = user_det.id
        this.user.email = user_det.email
        this.user.firstName = user_det.firstName
        this.user.otherNames = user_det.otherNames
        this.user.country = user_det.country
        this.user.organisation = user_det.organisation
        console.log(this.user)
      }else{
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: 'Reload the page. If problems persist contact the admin'  
        })
      }
      this.accountDetailsForm = this.fb.group({
        firstName: [this.user.firstName?this.user.firstName:''],
        otherNames: [this.user.otherNames?this.user.otherNames:'',[Validators.required]],
        email: [{value:this.user.email?this.user.email:'', disabled: true},[Validators.required]],
        country: [this.user.country?this.user.country:'',[Validators.required]],
        organisation: [this.user.organisation?this.user.organisation:'',[Validators.required]],
        password: new FormControl(''),
      })
      this.passwordResetForm = this.fb.group({
        email: new FormControl({value:this.user.email?this.user.email:'', disabled: true}),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
        realm: new FormControl('localsql', [Validators.required])
      })
    })

  }
  updateUser(){
    if(this.accountDetailsForm.status == 'VALID') {
      this.load = true
      this.auth.updateUser(this.accountDetailsForm.value.firstName,this.accountDetailsForm.value.otherNames, this.accountDetailsForm.value.email, this.accountDetailsForm.value.country, this.accountDetailsForm.value.organisation).subscribe((response: any) => {
        console.log(response.success);
        let res = response
        if(res.success){
          
          this.error = ''
          this.load = false
          setTimeout(() => {
            Swal.fire({  
              icon: 'success',  
              title: 'Done',  
              text: 'Details changed successfully',  
              footer: "Reloading..."  
            });
             window.location.reload()
          }, 1000);
          
          // window.location.reload()
          // this._location.back();
        }else{
          
          this.error = ''
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
      // if(this.passwordResetForm.value.email){
        this.load = true
        
        this.auth.changePassword(localStorage.getItem('email'), "").subscribe((response:any) => {
          console.log(response);
          if(response.success){
            this.error = ''
            this.load = false
            setTimeout(() => {
              Swal.fire({  
                icon: 'success',  
                title: 'Done',  
                text: 'Password changed successfully',  
                footer: "Logging out..."  
              });
              this.auth.logout()
            }, 1000);
            
            
          }else{
            this.load = false
            Swal.fire({  
              icon: 'error',  
              title: 'Failed',  
              text: "Try again",  
              // footer: 'Check your email inbox. Then sign in.'  
            })
          }
        })
      // }else {
      //   this.warn = "Make sure to fill all the required form field before submiting"
      //   Swal.fire({  
      //     icon: 'error',  
      //     title: 'Oops...',  
      //     text: 'Email address is required',
      //   })
      // }
    }else {
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Passwords did not match'
      })
    }
    
  }
}
