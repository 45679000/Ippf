import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {

  public studyDescriptionDisp: boolean = true;
  public documentationDisp: boolean = false;
  public dataDescriptionDisp: boolean = false;
  public dispStudyDescription(){
    this.studyDescriptionDisp = true;
    this.documentationDisp = false;
    this.dataDescriptionDisp = false;
  
  }
  public dispDocumentation(){
    this.studyDescriptionDisp = false;
    this.documentationDisp = true;
    this.dataDescriptionDisp = false;
  
  }
  public dispDescription(){
    this.studyDescriptionDisp = false;
    this.documentationDisp = false;
    this.dataDescriptionDisp = true;
  
  }
  constructor() { }

  ngOnInit(): void {
  }

}
