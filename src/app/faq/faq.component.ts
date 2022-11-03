import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public showAnswerOne: boolean = false
  public showAnswerTwo: boolean = false
  public showAnswerThree: boolean = false
  public showAnswerFour: boolean = false
  public showAnswerFive: boolean = false
  public showAnswerSix: boolean = false
  public showAnswerSeven: boolean = false
  public showAnswerEight: boolean = false
  public showAnswerNine: boolean = false
  public showAnswerTen: boolean = false
  public showAnswerEleven: boolean = false
  public showAnswerTwelve: boolean = false
  public faq:string = 'one'
  public isActive:boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.faq)
  }
  faq_number(number: string) {
    this.faq = number
    console.log(this.faq);
    
  }
  activeLink(number:string){
    if(this.faq == number){
      return true
    }else{
      return false
    }
  }
}
