import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { DatasetService } from '../../services/datasets-services.service'
import { Dataset } from '../../interfaces/dataset'
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
    // datafile: new FormControl()
  })

  tags:any
  groups:any
  success:boolean = false
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
    url: new FormControl()
  })
  constructor(private datasetService: DatasetService) { }

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
  }
  onSubmit(){
    // console.log(this.newDatasetForm.value.dataset)
    this.datasetService.addDataset(this.newDatasetForm.value).subscribe((response: any) => {
      console.log(response);
      this.dataset = response.result
      this.success = response.success
      // this.dataset = response.result
    })
    // console.log(this.newDatasetForm.value);
    
  }
  submitResource() {
    this.datasetService.addResource(this.newResourceForm.value).subscribe((response: any) => {
      console.log(response);
      this.dataset = response.result
      this.resource_uploaded = response.success
      if(response.success){
        this.newResourceForm.reset()
      }
      // this.dataset = response.result
    })
  }

}
