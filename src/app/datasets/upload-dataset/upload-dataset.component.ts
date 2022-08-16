import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { DatasetService } from '../../services/datasets-services.service'
import { Dataset } from '../../interfaces/dataset'
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

interface Status {
  success: boolean
}
@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.css']
})
export class UploadDatasetComponent implements OnInit {


  newDatasetForm = new FormGroup({
    name: new FormControl(),
    title: new FormControl(),
    tags: new FormControl(),
    notes: new FormControl(),
    private: new FormControl(),
    author: new FormControl(),
    author_email: new FormControl(),
    maintainer: new FormControl(),
    maintainer_email: new FormControl(),
    license_id: new FormControl(),
    owner_org: new FormControl('',{}),
    // dataset: new FormControl(),
    datafile: new FormControl()
  })

  id:any
  resource_id:any
  edit:boolean = false
  tags:any
  groups:any
  success:boolean = true
  resource_uploaded:boolean = false
  dataset: Dataset = {
    author: '',
    author_email: '',
    creator_user_id: '',
    extras: [],
    groups: [],
    id: '',
    isopen: false,
    license_id: '',
    license_title: '',
    maintainer: '',
    maintainer_email: '',
    metadata_created: '',
    metadata_modified: '',
    name: '',
    notes: '',
    num_resources: 0,
    num_tags: 0,
    organization: {},
    owner_org: '',
    private: false,
    relationships_as_object: [],
    relationships_as_subject: [],
    resources: [],
    state: '',
    tags: {},
    title: '',
    type: '',
    url: '',
    version: ''
  }
  newResourceForm = new FormGroup({
    package_id: new FormControl(
      {
        value: this.dataset.id.length > 1?this.dataset.id:'',
        // disabled: true,
      }),
    description: new FormControl(),
    format: new FormControl(),
    state: new FormControl(),
    name: new FormControl(),
    upload: new FormControl()
  })
  file: any
  onChange(event:any) {
    this.file = event.target.value;
  }
  constructor(private datasetService: DatasetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.datasetService.addDataset().subscribe((response: any) => {
    //   console.log(response);
    //   this.success = response.success
    //   this.dataset = response.result
    // })
    this.datasetService.getAllTags().subscribe((tag: any) => {
      this.tags = tag
    })
    this.datasetService.getAllGroups().subscribe((item: any) => {
      this.groups = item
    })
    // this.datasetService.createViews().subscribe((e: any) => {
    //   console.log(e);
      
    // })
    this.route.queryParamMap.subscribe(params => { 
      if(params.get('id') != null){
        this.id = params.get('id');
        this.resource_id = params.get('resource_id')
        if(this.id.length > 0 || this.id != null) {
          this.edit = true
          this.datasetService.getADataset(this.id).subscribe((data:any) => {
            this.dataset = data
          })
        }
      }
      
      // this.datasetForm.value.dataset = this.id
      // this.datasetForm.value.datafile = this.resource_id
      // console.log('Query params ',this.pageNo) 
    });
  }
  onSubmit(){
    // console.log(this.newDatasetForm.value.dataset)
    if(this.edit){
      this.datasetService.updateDataset(this.newDatasetForm.value, this.dataset.id).subscribe((response: any) => {
        console.log(response);
        this.dataset = response.result
        // this.success = response.success
        if(response.success){
          Swal.fire({  
            icon: 'success',  
            title: 'Done',  
            text: 'Dataset updated successfully',  
            footer: "Go back to datasets to view the Changes"  
          });
        }else {
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',  
            footer: 'Try again. If problems persist contact the admin'  
          })
        }
        // this.dataset = response.result
      })
    } else {
      this.datasetService.addDataset(this.newDatasetForm.value).subscribe((response: any) => {
        console.log(response);
        this.dataset = response.result
        this.success = response.success
        
        // this.dataset = response.result
      })
    }
    // console.log(this.newDatasetForm.value);
    
  }
  submitResource() {
    this.newResourceForm.controls['upload'].setValue(this.file)
    this.datasetService.addResource(this.newResourceForm.value).subscribe((response: any) => {
      console.log(this.newResourceForm.value);
      this.dataset = response.result
      this.resource_uploaded = response.success
      if(response.success){
        this.newResourceForm.reset()
      }
      // this.dataset = response.result
    })
  }

}
