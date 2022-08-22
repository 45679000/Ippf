import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../auth-service.service'
import { User } from '../../interfaces/UserDetails';
import { DatasetService } from '../../services/datasets-services.service';
import { Resource } from '../../interfaces/resource'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-request',
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.css']
})
export class DataRequestComponent implements OnInit {

  datasets:any = []
  dataFiles: Resource []= []
  datasetRequested: string = ''
  id: any
  resource_id: any
  user: User ={
    editable: false,
    email: "",
    givenname: "",
    id: 0,
    password: "",
    resolver: "",
    userid: 0,
    username: ""
  }
  dataRequest = new FormGroup({
    name: new FormControl(this.user.username, [Validators.required]),
    email: new FormControl(this.user.email, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    dataset: new FormControl('', [Validators.required]),
    organisation: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required])
  })
  datasetForm = new FormGroup({
    dataset: new FormControl(),
    datafile: new FormControl()
  })
  constructor(private auth: AuthServiceService, private datasetService: DatasetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListOfDatasets()
    this.dataRequest.controls.name.disable()
    this.dataRequest.controls.email.disable()
    // this.dataRequest.controls.dataset.disable()
    this.auth.getUserDetails().subscribe((item:any) => {
      
      if(item == 500 || item == 0){
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: 'Reload the page. If problems persist contact the admin'  
        })
      } else {
        if(item.status == true) {
          this.user = item.result
          
        }
      }
    })
    this.route.queryParamMap.subscribe(params => { 
      this.id = params.get('id');
      this.resource_id = params.get('resource_id')
      this.datasetForm.value.dataset = this.id
      this.datasetForm.value.datafile = this.resource_id
      // console.log('Query params ',this.pageNo) 
    });
  }
  submit(){
    if(this.dataRequest.status == "INVALID"){
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Make sure to fill all the required fields',    
      })
    } else {
      // send request
    }
    
  }
  setDataset(){
    this.datasetRequested = this.datasetForm.value.dataset
    
  }
  getListOfDatasets(){
    this.datasetService.allDatasets.subscribe((e) => {
      this.datasets = e
    })
  }
  getListOfDatafiles(){
    this.datasetService.getADataset(this.datasetForm.value.dataset).subscribe((e:any) => {
      this.dataFiles = e.resources
      
    })
  }
}
