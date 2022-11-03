import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Dataset } from '../../interfaces/dataset'
import { Resource } from '../../interfaces/resource'
import { Observable } from 'rxjs';
import { DatasetService } from '../../services/datasets-services.service';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {
  id: any
  dataOfDataset: any = {}
  resourcesArray: any[] = []
  metedata: any = []
  resource: Resource = {
    cache_last_updated: '',
    cache_url: '',
    created: '',
    datastore_active: false,
    datastore_contains_all_records_of_source_file: false,
    description: '',
    format: '',
    hash: '',
    id: '',
    last_modified: '',
    metadata_modified: '',
    mimetype: '',
    mimetype_inner: '',
    name: '',
    package_id: '',
    position: 0,
    resource_type: '',
    size: 0,
    state: '',
    url: '',
    original_url: '',
    url_type: ''
  }
  public studyDescriptionDisp: boolean = true;
  public documentationDisp: boolean = false;
  public dataDescriptionDisp: boolean = false;
  public dispStudyDescription(){
    this.studyDescriptionDisp = true;
    this.documentationDisp = false;  
  }
  public dispDocumentation(){
    this.studyDescriptionDisp = false;
    this.documentationDisp = true; 
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  constructor(private route: ActivatedRoute, private datasetService: DatasetService) { }

  ngOnInit(): void {
    // data of a dataset
    this.id = this.route.snapshot.paramMap.get('id')
    const data = this.datasetService.getADataset(this.id)
    data.subscribe((val: any) => {
      this.dataOfDataset = val
      this.resourcesArray = val.latestVersion.files
      this.metedata = val.latestVersion.metadataBlocks.citation.fields
      console.log(val.latestVersion);
      
      // val.resources.forEach((val: any) => {
      //   this.resourcesArray = [...this.resourcesArray, val]
      // })
    })
    const csvData = this.datasetService.viewCsv('yee')
    csvData.subscribe((val: any) => {
      console.log(val);
      
    })
  }
  resourceExistUrl(resource :any):boolean{
    if(resource.url.length > 0){
      return true
    } else if(resource.original_url && resource.original_url.length > 0){
        return true
    } else {
      return false
    }
  }
  // return_value(multiple:boolean, value:any){
  //   let val
  //   if(multiple){
  //     value.forEach(element => {
  //       val        
  //     });
  //   }
  // }
}
