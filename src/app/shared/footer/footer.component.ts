import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  feedbackForm = new FormGroup({
    feedback: new FormControl('', [Validators.required]),
    // name: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }
  submit(){
    if(this.feedbackForm.valid){
      
    }else {
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: "Make sure you fill out all the form input fields", 
      })
    }
  }
}
