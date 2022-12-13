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
  dataFiles: any = {}
  datasetRequested: string = ''
  id: any
  name:any
  resource_id: any
  user: User ={
    editable: false,
    email: "",
    givenname: "",
    firstName: "",
    otherNames:'',
    id: 0,
    password: "",
    resolver: "",
    userid: 0,
    username: "",
    country:"",
    organisation:""
  }
  dataRequest = new FormGroup({
    // name: new FormControl(this.user.username, [Validators.required]),
    // email: new FormControl(this.user.email, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    // dataset: new FormControl('', [Validators.required]),
    organisation: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required])
  })
  datasetForm = new FormGroup({
    dataset: new FormControl(),
    datafile: new FormControl()
  })
  constructor(private auth: AuthServiceService, private datasetService: DatasetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.name = this.route.snapshot.paramMap.get('name')
    this.dataFiles.id = this.id
    this.dataFiles.filename = this.name
    // this.dataFiles = this.datasetService.dataFile
    // this.dataRequest.value.dataset = this.dataFiles.filename
  }
  submit(){
       // this.load = true
    this.datasetService.requestDataset(this.dataFiles.id,this.dataRequest.value.reason,this.dataRequest.value.country, this.dataRequest.value.organisation ).subscribe((res:any) => {
      // this.load = false
      // || res.responseJSON.status == "ERROR"
      console.log(res)
        if(res.status == 500){
          Swal.fire({  
            icon: 'error',  
            // title: 'Oops...',  
            text: res.statusText?res.statusText:"There was a problem",  
            // footer: 'Try again. If problems persist contact the admin'  
          })
        } else if(res.status == 400){
          let response_message = JSON.parse(res.responseText)
          Swal.fire({  
            icon: 'error',  
            // title: 'Oops...',  
            text: response_message ? response_message.message : "There was a problem",  
            // footer: 'Try again. If problems persist contact the admin'  
          })
        }else {
          Swal.fire({  
            icon: 'success',  
            title: "Your request was sent, you'll receive a response via email",  
            text: res.message,  
            // footer: 'Try again. If problems persist contact the admin'  
          })
        }
    })
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
