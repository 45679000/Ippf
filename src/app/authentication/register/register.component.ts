import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import Swal from 'sweetalert2';
import { RoutesService } from '../../services/routes.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    otherNames: new FormControl('',[Validators.required]),
    // surname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required]),
    // remember: [true]
  });
  success:boolean = false
  failed:boolean = false
  warn:string = ''
  load:boolean = false
  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: ActivatedRoute, private routesService: RoutesService) { }

  ngOnInit(): void {
    this.routesService.changePrevious('registration')
  }
  register(){
    
    // if(this.registrationForm.status == 'VALID'){

      if(this.registrationForm.value.password == this.registrationForm.value.passwordConfirmation){
        this.load = true
        this.auth.signup(this.registrationForm.value.firstName, this.registrationForm.value.otherNames, this.registrationForm.value.email, this.registrationForm.value.password).subscribe((res: any)=>{
            if(res.succces){
              this.success = true
              this.failed = false
              Swal.fire({  
                icon: 'success',  
                title: 'Done',  
                text: 'You created an account successfully. View your email inbox to verify email address',  
                // footer: 'You '  
              })  
              this.registrationForm.reset()
              this.load = false
            }else{
              this.success = false
              this.failed = true
              this.load = false
              Swal.fire({  
                icon: 'error',  
                title: 'Oops...',  
                text: res.message.description,  
                footer: 'Try again. If problems persist contact the admin'  
              })
            }
          // }
          
        })
      }else{
        this.warn = "Passwords did not match"
      }
      // console.log(this.registrationForm.value)
    // } else {
    //   alert('All required form fields not filled')
    // }
    
  }

}
