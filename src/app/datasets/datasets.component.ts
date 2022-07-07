import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { DatasetService } from '../services/datasets-services.service';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { Group } from '../interfaces/groups'
import { FormGroup, FormControl, Validators } from '@angular/forms'

interface Data {
  help: string,
  result: string[],
  success: boolean
}
interface richDataset {
  result: string[];
}
interface dataDaset {
  author: string
  author_email: string
  creator_user_id: string
  extras: Array<string>
  groups: Array<string>
  id: string
  isopen: boolean
  license_id: string
  license_title: string
  maintainer: string
  maintainer_email: string
  metadata_created: string
  metadata_modified: string
  name: string
  notes: string
  num_resources: number
  num_tags: number
  organization: object
  owner_org: string
  private: boolean
  relationships_as_object: Array<string>
  relationships_as_subject: Array<string>
  resources: Array<string>,
  state: string
  tags: object
  title: string
  type: string
  url: string
  version: string

}
// const category: Category = {
//   name: '',
//   description: 'My Description',
// };
@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  searchForm = new FormGroup({
    q: new FormControl(),
    tag: new FormControl(),
    group: new FormControl()
  })
  filterForm = new FormGroup ({
    tag: new FormControl(),
    group: new FormControl()
  })
  datasets:any = []
  someDataset:any =[]
  aalData:dataDaset[] = []
  xxy: any
  dataOfDataset: dataDaset = {
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
    version: '',
  }
  groups:Group []= []
  groupsLength: boolean = false
  tags: any
  constructor(private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.datasetService.allDatasets.subscribe(
      value => { 
        this.datasets = value
        this.xxy = this.datasets.length
      }
    );
    this.allTags.subscribe(val=>{
      this.tags = val
    })
    this.datasetService.getAllGroups().subscribe((val: any) => {
      this.groups = val
      console.log(this.groups)
    })
    this.datasetService.getAllData().
    subscribe((val: any)=>{
      this.aalData = [ ...this.aalData, val];
      // this.aalData = val
      // const dataetData: dataDaset = val;

      console.log(this.aalData)
    })
  }

  allDatasets = new Observable<Data>((observer) => {
    // console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/package_list',
      success: function (response){
        observer.next(response.result)
      },
      error: function(error){
        console.log(error)
      }
    })
  });
  allTags = new Observable((observer) => {
    // console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/tag_list',
      success: function (response){
        // console.log(response)
        observer.next(response.result)
      },
      error: function(error){
        console.log(error)
      }
    })
  });
  oneDataset = new Observable<dataDaset>((observer) => {
    
    // console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/package_show?id=ippf',
      success: function (response){
        console.log(response)
        observer.next(response.result)
      }
    })
  });
  onSubmit() {
    console.log(this.searchForm.value.q == null)
    // console.log(this.filterForm.value);
    this.datasetService.searchDataset(this.searchForm.value.q, this.searchForm.value.tag, this.searchForm.value.group).subscribe((val: any) => {
      console.log(val);
      
    })
    
  }

  
}
