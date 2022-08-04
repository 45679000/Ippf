import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service'
import { User } from 'src/app/interfaces/UserDetails';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  load:boolean = false
  error:string =''
  result:any
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
  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.auth.getUserDetails().subscribe((item:any) => {
      
      if(item == 500 || item == 0){
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: 'Try again. If problems persist contact the admin'  
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
}
