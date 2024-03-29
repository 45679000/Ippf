import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasetService } from '../../services/datasets-services.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Resource } from '../../interfaces/resource'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer } from "@angular/platform-browser";
import { Constants } from "../../config/constants"
import { FlexmonsterPivot } from "ng-flexmonster";
import Swal from 'sweetalert2';

interface Item {
  item: string[]
}
interface Pie {
  value: number
  name: string
}
@Component({
  selector: 'app-wishscope',
  templateUrl: './wishscope.component.html',
  styleUrls: ['./wishscope.component.css']
})
export class WishscopeComponent implements OnInit {
  dataverse_url: string = Constants.dataverse_url 
  load: boolean = false
  show_files:boolean = false
  datasets:any = []
  dataFiles: Resource []= []
  chartsType:any = ['pie','Bar/Line'] 
  datasetForm = new FormGroup({
    dataset: new FormControl(),
    datafile: new FormControl()
  })
  seriesSetForm = new FormGroup({
    xAxisValues: new FormControl(),
    data: new FormControl(),
    type: new FormControl()
  })
  chartForm = new FormGroup({
    chart: new FormControl()
  })
  topForm = new FormGroup({
    dataset: new FormControl(),
    dataFIle: new FormControl()
  })
  page = 1;
  pageSize = 25;
  collectionSize:number = 0;
  id:any 
  resource_id: any
  url: string = ''
  displayIframe: boolean = false
  dataset_id:number = 0
  data_type:string = ''
  // countries: Country[] = [];
  // @ViewChild("pivot") pivot!: FlexmonsterPivot;
  @ViewChild('pivot')pivot!: FlexmonsterPivot;
   report: Object = {
    
  };
  constructor(private appService: DatasetService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
    // this.refreshCountries()
    // console.log(this.collectionSize)
    
  }

  ngOnInit(): void {
    this.getListOfDatasets()
    this.route.queryParamMap.subscribe(params => { 
      this.id = params.get('id');
      this.resource_id = params.get('resource_id')
      this.datasetForm.value.dataset = this.id
      this.datasetForm.value.datafile = this.resource_id
      // console.log('Query params ',this.pageNo) 
    });
    this.dataset_id = this.appService.dataset_id
    if(this.appService.file_type == "application/json"){
      this.data_type = "json"
    }else if(this.appService.file_type == "text/csv"){
      this.data_type = "csv"
    }
    this.data_type = this.appService.file_type 
    console.log(this.data_type)
    if(this.dataset_id){
      this.checkFiletype(this.appService.file_type,this.dataset_id, this.appService.label)
    }
    // else {
    //   alert("Chooses the data to visalize in the datasets page")
    // }
  }
  onLoadRemoteJSON() {
    let filename = prompt("Open remote JSON", "https://filesamples.com/samples/code/json/sample1.json");
    if (filename != null) {
      this.pivot.flexmonster.connectTo({
        type: "json",
        filename: filename,
      });
    }
  }
   customizeToolbar(toolbar: any) {
    let tabs = toolbar.getTabs();
       toolbar.getTabs = () => {
         tabs.shift()
          tabs.shift()
        // tabs = [];
        // // adding a new tab
        // tabs.push({
        //     id: "fm-tab-newtab",
        //     title: "New Tab",
        //     // specifying a custom handler
        //     // handler: () => this.showInfo(),
        //     icon: toolbar.icons.open,
        // });
        return tabs;
    };
  }
  // function customizeToolbar(toolbar:any) { 
  //   // get all tabs 
  //   let tabs = toolbar.getTabs(); 
  //   toolbar.getTabs = function () {
  //       // remove the Connect tab using its id
  //       tabs = tabs.filter(tab => tab.id != "fm-tab-connect");
  //       return tabs; 
  //   } 
  // }
  checkFiletype(file_type:any, datafile_id:any, label:string){
    if(file_type != "application/json" || file_type != "text/csv"){
        Swal.fire({  
              icon: 'error',  
              // title: 'Oops...',  
              text: "The file you want to visualize is neither a csv file nor json, kindly choose a dataset that is either in json or csv format",  
               html: 'File type incompatibility'+'<br>'+'Download and visualize using other tools ' +'<a href="'+this.dataverse_url+'/access/datafile/'+datafile_id+'" class="btn btn-link"><span>  <i class="fas fa-download"></i></span>'+label+'</a>'
            })
    } else {
       this.report = {
          dataSource: {
          // type: this.data_type,
          filename: this.dataverse_url+"/access/datafile/"+this.dataset_id,
        }
      }
    }
  }
  onLoadRemoteCSV(id:any) {
    this.dataFiles.forEach((item:any) => {
      if(id ==item.dataFile.id){
        if(item.restricted){
          console.log(item)
          this.appService.getRequestedData().subscribe((response:any) => {
            response.items.forEach((file:any) => {
              if(file.file_id == item.dataFile.id){
                let filename = this.dataverse_url+"/access/datafile/"+id+"?key="+localStorage.getItem("id")
                if (filename != null) {
                  this.pivot.flexmonster.connectTo({
                    type: "csv",
                    filename: filename,
                  });
                }
              }else{
                Swal.fire({  
                  icon: 'error',  
                  title: 'The file you want to visualize is private and you have to request for permision for it.',  
                  text: "",  
                  html: `<a href="/request/${id}/${item.label}" class="btn btn-link">Request for permision</a>`
                })
              }
            })
          })
          
        }else{
          let filename = this.dataverse_url+"/access/datafile/"+id
          if (filename != null) {
          // this.pivot.flexmonster.setReport(this.report);
            this.pivot.flexmonster.connectTo({
              type: "csv",
              filename: filename,
            });
          }
        }
      }
    })
  }
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  returnRow(item:any){
    return item
  }
  getListOfDatasets(){
    this.appService.getWishScope().subscribe((e:any) => {
      this.datasets = e.items
      this.datasets.forEach((item:any) => {
        this.appService.getADataset(item.global_id).subscribe((file:any) => {
          // console.log(file)
          file.latestVersion.files.forEach((f:any)=>{
            this.dataFiles.push(f)
          })
        })
      })  
    })
  }
  getListOfDatafiles(){
    this.dataFiles = []
    this.show_files = false
    this.show_files = true
    this.appService.getADataset(this.datasetForm.value.dataset).subscribe((e:any) => {
        this.dataFiles = e.latestVersion.files
        console.log(e)
    })
  }
  getCsv(){
    this.load = true
    this.url = `${Constants.ckan_url}/dataset/${this.datasetForm.value.dataset}/resource/${this.datasetForm.value.datafile}`
    // this.url = `http://3.236.19.31/dataset/family-planning/resource/e75b0996-3a0b-4e6e-921f-f7e5a1892781/view/8af72bce-43a7-41f3-b7de-eb9fac8f2edb`

    this.displayIframe = true
    this.load = false
  }
 
  setCsvFile(){
    this.getCsv()
  }
  getLicenseKey(){
    return "Z7R1-XCJF18-036124-6F5O64"
  }

}