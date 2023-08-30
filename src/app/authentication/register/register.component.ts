import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import Swal from 'sweetalert2';
import { RoutesService } from '../../services/routes.service'
import { Constants } from '../../config/constants'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logo = Constants.logo_location
  registrationForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    otherNames: new FormControl('',[Validators.required]),
    country: new FormControl('Afghanistan',[Validators.required]),
    organization: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required]),
    // remember: [true]
  });
  acceptTermsForm = new FormGroup({
    accepted:new FormControl(false, [Validators.required])
  })
  success:boolean = false
  failed:boolean = false
  warn:string = ''
  load:boolean = false
  countries:any = []
  closeResult:string = ""
  accepted_terms:boolean = false
  openModal:boolean = false
  constructor(private modalService: NgbModal,private fb: FormBuilder, private auth: AuthServiceService, private route: ActivatedRoute, private routesService: RoutesService) { }

  ngOnInit(): void {
    this.routesService.changePrevious('registration')
    this.auth.getCountries().subscribe((res:any)=>{
      let orderArr = []
      res.forEach(i => {
        orderArr.push(i.name.common)
      })
      this.countries = orderArr.sort()
    })
  }
  register(){
    // if(this.registrationForm.status == 'VALID'){

      if(this.registrationForm.value.password == this.registrationForm.value.passwordConfirmation){
        this.accepted_terms = this.acceptTermsForm.value.accepted
        if(this.accepted_terms==true){
          this.load = true
          this.auth.signup(this.registrationForm.value.firstName, this.registrationForm.value.otherNames, this.registrationForm.value.email, this.registrationForm.value.password,this.registrationForm.value.country, this.registrationForm.value.organization).subscribe((res: any)=>{
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
          this.modalService.open('')
        }
      }else{
        this.warn = "Passwords did not match"
      }
      // console.log(this.registrationForm.value)
    // } else {
    //   alert('All required form fields not filled')
    // }
    
  }
  checkbox(){
    this.accepted_terms=this.acceptTermsForm.value.accepted
    console.log(this.accepted_terms)
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
