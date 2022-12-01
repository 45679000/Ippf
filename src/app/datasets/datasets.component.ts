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
  sortForm = new FormGroup({
    sort: new FormControl()
  })
  sizeForm = new FormGroup({
    size: new FormControl()
  })
  page:any = 1;
  pageSize: any = 20
  datasets:any = []
  someDataset:any =[]
  aalData:any[] = []
  aalDataDuplicare: any[] = []
  xxy: any = 20
  searchCount: Number = 0
  subjects:any = []
  loader:boolean = true
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
  header: string = 'Available datasets'
  
  constructor(private datasetService: DatasetService) { 
    
  }

  ngOnInit(): void {
    // this.datasetService.allDatasets.subscribe(
    //   value => { 
    //     this.datasets = value
    //     this.xxy = this.datasets.length
    //     this.loader = false
    //   }
    // );
    this.loader = true
    this.datasetService.getAllTags().subscribe((val: any)=>{
      this.tags = val
    })
    // this.datasetService.getAllGroups().subscribe((val: any) => {
    //   this.groups = val
    // })
    this.datasetService.getAllData().
    subscribe((val: any)=>{
      
      this.aalData = val.items;
      console.log(this.aalData[0].metadataBlocks.ippf.fields[0].value.meta_title.value)
      this.aalDataDuplicare = this.aalData
      this.searchCount = val.total_count
      this.xxy = val.items.length
      this.loader = false
      
    })
    if(this.aalData.length >= 0){
        this.loader = false
      }
  }
  onSubmit() {
    if(this.filterForm.value.tag){
      let filteredData = []
      this.aalDataDuplicare.forEach((data:any)=>{
        if(this.compareSubjects(this.filterForm.value.tag, data.subjects)){
          filteredData.push(data)
        }
      } )
      // this.loader = true
      this.xxy = filteredData.length
      this.aalData = filteredData
    }
    this.loader = true
    this.changeHeader()
    this.datasetService.searchDataset(this.searchForm.value.q, this.filterForm.value.tag, this.filterForm.value.group).subscribe((val: any) => {      
      this.loader = false
      this.xxy = val.length
      this.aalData = val
      
    })
  }
  compareSubjects(form_value:string, subject_array:any){
    let equal = true
    subject_array.forEach((item: string)=>{
        if(item == form_value){
          equal =true
        }else{
          equal = false
        }
    })
    return equal
  }
  sliceString(description:string){
    console.log(description.length)
    let x = description.length > 100 ? description.slice(0,100) + "..." : description
    return "x"
  }
  onSort(valu: any){
    console.log(valu.target.value)
    this.loader = true 
    let sort_val = valu.target.value
    let sort = sort_val.split(',')
    this.datasetService.searchDataset('*', '', '',sort).subscribe((val: any) => {
      console.log(val);
      
      this.loader = false
      this.xxy = val.length
      this.aalData = val
      
    })

  }
  onChangeSize(size:any){
    console.log(size.target.value)
    this.loader = true 
    let sort_val = size.target.value
    let size_of_data = sort_val.split(',')
    this.datasetService.searchDataset('*', '', '','',size_of_data).subscribe((val: any) => {
      this.loader = false
      this.xxy = val.length
      this.aalData = val
      
    })
  }
  changeHeader(){
    this.header = "Available datasets"
    if(this.searchForm.value.q !== null || this.searchForm.value.tag !== null || this.searchForm.value.group !== null){
      // this.header = "Search results - " 
      // if (this.searchForm.value.q !=null ) {
      //   this.header += " of " + this.searchForm.value.q
      // }
    }else {
      this.header = "Available datasets"
    }
  }
  clearTags(){
    this.searchForm.reset();
    this.aalData = this.aalDataDuplicare
    // this.loader = true
    // this.datasetService.getAllData().
    // subscribe((val: any)=>{
    //   this.xxy = val.length
    //   this.aalData = val;
    //   this.loader = false
    // })
  }
  addSubjects(subjectArray: any){
    subjectArray.forEach((item:any) => {
      if(!this.checkSubject(item)){
        this.subjects.push(item)
      }
    })
  }
  checkSubject(sub:string){
    let exists = false
    this.subjects.forEach((subject:string) => {
      if(subject == sub){
        exists = true
      }
    })
    return exists
  }
  checkName(data:any){
    if(data.name === ""){
      return false
    }else{
      return true
    }
  }
  
}
