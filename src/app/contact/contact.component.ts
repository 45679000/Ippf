import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: any;
  load:boolean  = false
  constructor(private feedback: FeedbackService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: ['0', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }
  send(){
    // Swal.fire({  
    //   icon: 'success',  
    //   text: 'Your message wass sent'
    // })
    this.load = true
    let country = this.contactForm.value.country
    let message = this.contactForm.value.message
    this.feedback.sendFeedBack(country, message, "contact").subscribe((e: any) => {
      this.load = false
      // if(e.success){
        Swal.fire({  
          icon: 'success',  
          text: 'Your message was sent'
        })
        this.contactForm.reset()
      // }
      // else{
      //   Swal.fire({  
      //     icon: 'error',  
      //     title: 'Oops...',  
      //     text: "There was a problem"  
      //   })
      // }
      
    })
  }
}
