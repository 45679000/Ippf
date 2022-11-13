import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Dataset } from '../../interfaces/dataset'
import { Resource } from '../../interfaces/resource'
import { Observable } from 'rxjs';
import { DatasetService } from '../../services/datasets-services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Constants } from '../../config/constants'

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {
  id: any
  dataOfDataset: any = {}
  resourcesArray: any[] = []
  dataset_info: any = []
  meta: any = {}
  base_url: string = Constants.dataverse_url
  load:boolean  = false  
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
  table:boolean = false
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
  constructor(private route: ActivatedRoute, private datasetService: DatasetService, private routing: Router) { }

  ngOnInit(): void {
    this.load = true
    // data of a dataset
    this.id = this.route.snapshot.paramMap.get('id')
    const data = this.datasetService.getADataset(this.id)
    data.subscribe((val: any) => {
      console.log(val)
      this.dataOfDataset = val
      this.resourcesArray = val.latestVersion.files
      // 
        if(this.dataOfDataset != null){
          this.datasetService.getMetaData(this.dataOfDataset.id).subscribe((e:any)=>{
            console.log(e);
            
            this.meta = e
            this.table = true
            // console.log(this.meta);
            this.load = false
            
          })
          
          
        }
        // if($t)
      // this.meta = val.dataset
      // console.log(this.meta);
      
      // })
      // console.log(this.metadata);
      // this.dataset_info = val.latestVersion.metadataBlocks.citation.fields
      
      // console.log(val.latestVersion);
      
      // val.resources.forEach((val: any) => {
      //   this.resourcesArray = [...this.resourcesArray, val]
      // })
    })
    
    const csvData = this.datasetService.viewCsv('yee')
    csvData.subscribe((val: any) => {
      console.log(val);
      
    })
  }
  mutlipleValues(value:any){
    let tet = ""
    if(typeof(value) == "object"){
      value.forEach((item:any)=>{
        if(typeof(item) == "string"){
          tet += `<p>${item}</p>`
        }else{
          tet += this.check(item)
        }
      })
    }
    return tet
    // return this.keyVal(value)
  }
  keyVal(obj: any){
    // console.log(obj)
    let x = ""
    obj.forEach((y:any)=>{
      if(typeof(y) == "object"){
        for(const item in y){
          x += `<h2 class='lead_heading'>${this.camelToUnderscore(item)}</h2><p>${y['item']}</p>`
        }      
      }else if(typeof(y) == "string"){
        x += y + ', '
      }else{
        // console.log(y)
      }
    })
    return x
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
  check(e:any){
    // console.log(e)
    let x = ""
    if(typeof(e) == "object"){
      for(const item in e){
        if(e[item].multiple){
          // x += this.mutlipleValues(e[item].multiple)
          let mutli_values = e[item].value
          mutli_values.forEach((val:any) => {
            // console.log(mutli_values)
            x += `<p>${val}</p>`
          })
        }else{
          x += `<h2 class='lead_heading'>${this.camelToUnderscore(item)}</h2><p>${e[item].value}</p>`
        }
      }      
    }else if(typeof(e) == "string"){
      x += e + ', '
    }else{
      console.log(e)
    }
    // console.log(e)
    return x
  }
  camelToUnderscore(key:any) {
    
   let result = key.replace( /([A-Z])/g, " $1" );
    let result_two = result.toLowerCase()
   return result_two.charAt(0).toUpperCase() + result_two.slice(1);
  }
  // return_value(multiple:boolean, value:any){
  //   let val
  //   if(multiple){
  //     value.forEach(element => {
  //       val        
  //     });
  //   }
  // }
  requestData(id:number){
    this.load = true
    this.datasetService.requestDataset(id).subscribe((res) => {
      this.load = false
      console.log(res)
        if(res.status == "ERROR"){
          Swal.fire({  
            icon: 'error',  
            // title: 'Oops...',  
            text: res.message,  
            // footer: 'Try again. If problems persist contact the admin'  
          })
        }else {
          Swal.fire({  
            icon: 'success',  
            title: "our request was sent, you'll receive a response via email",  
            text: res.message,  
            // footer: 'Try again. If problems persist contact the admin'  
          })
        }
    })
  }
  setDatasetId(id:number, content_type:string){
    this.datasetService.dataset_id = id
    this.datasetService.file_type = content_type
    this.routing.navigate(['/wishscope'])
  }
}
