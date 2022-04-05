import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: any;
  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      accountType: ['',[Validators.required]],
      email: ['',  [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',  [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['',  [Validators.required, Validators.minLength(8)]],
      remember: [true]
    })
  }
  register(){
    if(this.registrationForm.valid){
      
      this.auth.createNewUser(this.registrationForm.value.name, this.registrationForm.value.email, this.registrationForm.value.country, this.registrationForm.value.accountType, this.registrationForm.value.password).subscribe(data =>{
        console.log(data);
        
      })
      // console.log(this.registrationForm.value)
    }
    
  }

}
