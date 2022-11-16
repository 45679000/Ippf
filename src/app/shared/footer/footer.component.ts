import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  load:boolean  = false
  feedbackForm = new FormGroup({
    feedback: new FormControl('', [Validators.required]),
    // name: new FormControl('', [Validators.required])
  })

  constructor(private feedback: FeedbackService) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.feedbackForm.valid){
      Swal.fire({  
        icon: 'info',  
        text: 'Your feedback has been sent. <br>Thank you for you valued input.'
      })
      this.feedback.sendFeedBack("", this.feedbackForm.value.feedback, "feedback").subscribe((e: any) => {
        // if(e.success){
          Swal.fire({  
            icon: 'success',  
            text: 'Your feedback was sent'
          })
          this.feedbackForm.reset()
        // }else{
        //   Swal.fire({  
        //     icon: 'error',  
        //     title: 'Oops...',  
        //     text: "There was a proble"  
        //   })
        // }
        
      })
    }else {
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: "Make sure you fill out all the form input fields", 
      })
    }
  }
}
