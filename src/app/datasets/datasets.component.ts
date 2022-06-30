import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { DatasetService } from '../services/datasets-services.service';
import { Observable } from 'rxjs';
import { data } from 'jquery';

interface Data {
  result: any;
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
  datasets: any
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
  tags: any
  constructor(private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.allDatasets.subscribe(
      value => { 
        this.datasets = value
        this.xxy = this.datasets.length 
      }
    );
    this.allTags.subscribe(val=>{
      this.tags = val
      // console.log(val)
    })
    this.oneDataset.subscribe(val=>{
      this.dataOfDataset = val
      // const dataetData: dataDaset = val;

      // console.log(val)
    })
    // this.datasets.forEach(element => {
      // console.log(this.datasets)
    // });
  }
  allDatasets = new Observable((observer) => {
    console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/package_list',
      success: function (response){
        observer.next(response.result)
      }
    })
  });
  allTags = new Observable((observer) => {
    console.log('Starting observable');
    $.ajax({
      method: "GET",
      // contentType:'application/json',
      dataType: 'jsonp',
      url:'http://44.204.72.194/api/3/action/tag_list',
      success: function (response){
        console.log(response)
        observer.next(response.result)
      }
    })
  });
  oneDataset = new Observable<dataDaset>((observer) => {
    console.log('Starting observable');
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
}
