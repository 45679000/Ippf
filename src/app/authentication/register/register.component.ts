import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    givenname: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required]),
    // remember: [true]
  });
  success:boolean = false
  failed:boolean = false
  warn:string = ''
  load:boolean = false
  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  register(){
    
    if(this.registrationForm.status == 'VALID'){
      console.log(this.registrationForm);

      if(this.registrationForm.value.password == this.registrationForm.value.passwordConfirmation){
        this.load = true
        this.auth.signup(this.registrationForm.value.username, this.registrationForm.value.givenname, this.registrationForm.value.surname, this.registrationForm.value.email, this.registrationForm.value.password).subscribe((res: any)=>{
          // console.log(res);
          if(res == 500) {
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Something went wrong!',  
              footer: 'Try again. If problems persist contact the admin'  
            })
            this.load = false
          }else if(res.error && res.error.code == 402){
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: res.error.message + ". Try a different username",  
              footer: 'Try again. If problems persist contact the admin'  
            })
            this.load = false
          }else{
            if(res.result.status != false){
              this.success = true
              this.failed = false
              Swal.fire({  
                icon: 'success',  
                title: 'Done',  
                text: 'You created an account successfully. View your email inbox to complete the process',  
                // footer: 'You '  
              })  
              this.load = false
            }
            else{
              this.success = false
              this.failed = true
              this.load = true
            }
          }
          
        })
      }else{
        this.warn = "Passwords did not match"
      }
      // console.log(this.registrationForm.value)
    } else {
      alert('All required form fields not filled')
    }
    
  }

}
