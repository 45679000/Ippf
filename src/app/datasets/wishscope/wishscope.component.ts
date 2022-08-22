import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../../services/datasets-services.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Resource } from '../../interfaces/resource'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer } from "@angular/platform-browser";

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
  load: boolean = false
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
  // countries: Country[] = [];
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
    // this.id = this.route.snapshot.paramMap.get('id')
    // this.resource_id = this.route.snapshot.paramMap.get('resource_id')
    console.log('id: ' + this.id + ' resource id:' + this.resource_id);
    
    // this.getCsv()
    // this.generateBasicLineChart()
  }
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  returnRow(item:any){
    return item
  }
  getListOfDatasets(){
    this.appService.allDatasets.subscribe((e) => {
      this.datasets = e
    })
  }
  getListOfDatafiles(){
    this.appService.getADataset(this.datasetForm.value.dataset).subscribe((e:any) => {
      this.dataFiles = e.resources
      console.log(this.dataFiles);
      
    })
  }
  getCsv(){
    this.load = true
    this.url = `http://3.236.19.31/dataset/${this.datasetForm.value.dataset}/resource/${this.datasetForm.value.datafile}`
    // this.url = `http://3.236.19.31/dataset/family-planning/resource/e75b0996-3a0b-4e6e-921f-f7e5a1892781/view/8af72bce-43a7-41f3-b7de-eb9fac8f2edb`

    this.displayIframe = true
    this.load = false
  }
 
  setCsvFile(){
    this.getCsv()
  }

}
