import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../services/datasets-services.service'
import { Dataset } from '../interfaces/dataset'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchResults: Dataset[] = []
  searchForm = new FormGroup({
    q: new FormControl(),
    tag: new FormControl(),
    group: new FormControl()
  })
  constructor(private datasetService: DatasetService, private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn ()
  }
  onSubmit() {
    this.datasetService.searchDataset(this.searchForm.value.q, this.searchForm.value.tag , this.searchForm.value.group).subscribe((val: any) => {
      this.searchResults = val.result.results
      console.log(this.searchResults);
      
    })
    
  }
}
