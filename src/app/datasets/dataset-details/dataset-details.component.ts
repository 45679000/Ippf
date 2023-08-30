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
  user_id:string = localStorage.getItem('id')
  dataOfDataset: any = {}
  resourcesArray: any[] = []
  dataset_info: any = []
  meta: any = {}
  data_description:any = {}
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
  approved_data:any[] = [] 
  table:boolean = false
  faq: string = "meta_identification"
  public studyDescriptionDisp: boolean = true;
  public documentationDisp: boolean = false;
  public dataDescriptionDisp: boolean = false;
  public dispStudyDescription(){
    this.studyDescriptionDisp = true;
    this.documentationDisp = false;  
    this.dataDescriptionDisp = false
  }
  public dispDocumentation(){
    this.dataDescriptionDisp = false
    this.studyDescriptionDisp = false;
    this.documentationDisp = true; 
  }
  public dispDataDescription(){
    this.dataDescriptionDisp = true
    this.studyDescriptionDisp = false;
    this.documentationDisp = false; 
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
      // console.log(val)
      this.dataOfDataset = val
      this.resourcesArray = val.latestVersion.files
      // 
        if(this.dataOfDataset != null){
          this.load = true
          this.datasetService.getMetaData(this.dataOfDataset.id).subscribe((e:any)=>{            
            this.meta = e
            this.dataset_info = e.fields[0].value
            this.table = true
            // console.log(this.meta);
            this.load = false
            
          })
          this.datasetService.getDataDesc(this.dataOfDataset.id).subscribe((desc:any)=>{
            this.data_description = desc.fields
            // console.log(this.data_description )
          })
          this.datasetService.addLog(localStorage.getItem('id'),"browse",this.id).subscribe((res:any) => {
            // console.log(res)
          })
        }
    })
    this.datasetService.getRequestedData().subscribe((data:any) => {
        let ids = []
        data.items.forEach((i:any)=>{
          ids.push(parseInt(i.file_id))
        })
        this.approved_data = ids
      })
    
    const csvData = this.datasetService.viewCsv('yee')
    csvData.subscribe((val: any) => {
      // console.log(val);
      
    })
  }
  mutlipleValues(value:any){
    let tet = ""
    if(typeof(value) == "object"){
      value.forEach((item:any)=>{
        // console.log(item)
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
          let typeName = e[item].typeName
          mutli_values.forEach((val:any) => {
            // console.log(mutli_values)
            x += `<div class='row col-12'><span class='lead_line col-lg-2 col-12 mb-2'><b>${this.camelToUnderscore(e[item].typeName)}: </b></span><span class='col-lg-9 col-12'>${val}</span></div>`
          })
        }else{
          x += `<div class='row col-12 mb-2'><span class='lead_line col-lg-2 col-12'><b>${this.camelToUnderscore(e[item].typeName)}: </b></span><span class='col-lg-9 col-12'>${e[item].value}</span></div>`
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
     // /([A-Z])/g
   let result = key.replace(/[^a-zA-Z0-9]+(.)/g, " $1" );

   let result_one = result.replace(/([A-Z])/g, " $1" ).replace("v1_desc_", "").replace("1","");
   // result_other = 
    let result_two = result_one.toLowerCase().replace('meta','').replace('desc','').replace("v ",'')
   return result_two.charAt(1).toUpperCase() + result_two.slice(2);
  }
  findIdentification(fields:any){
    fields.forEach((item:any)=>{
      if(item.typeName == 'meta_identification'){
        return item
      }
    })
  }
  setDatasetId(id:number, content_type:string,label:string){
    this.datasetService.dataset_id = id
    this.datasetService.file_type = content_type
    this.datasetService.label = label
    this.routing.navigate(['/wishscope'])
  }
  setDatasetIdRequest(dataFile:any){
    this.datasetService.dataFile = dataFile
    this.routing.navigate(['/request/'+dataFile.id+'/'+dataFile.filename])
  }
  checkIfApproved(id:any){
    console.log(id)
    console.log(this.approved_data)
    console.log(this.approved_data.includes(id))
    return this.approved_data.includes(id)
  }
  faq_number(number: string) {
    this.faq = number
    console.log(this.faq);
    
  }
  activeLink(number:string){
    if(this.faq == number){
      return true
    }else{
      return false
    }
  }
}
