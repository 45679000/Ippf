import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DatasetService } from '../../services/datasets-services.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { Dataset } from '../../interfaces/dataset'


interface CountryStatus{
  Slug:any,
  Date: string,
  Confirmed: number,
  Recovered: number,
  Deaths: number
}
interface Series {
  name: string;
  type: string;
  data: any[];
}
interface Resource {
  cache_last_updated: string
  cache_url: string
  created: string
  datastore_active: boolean
  datastore_contains_all_records_of_source_file: string
  description: string
  format: string
  hash: string
  id: string
  last_modified: string
  metadata_modified: string
  mimetype: string
  mimetype_inner: string
  name: string
  package_id:string
  position: number
  resource_type: string
  size: number
  state: "active"
  url: string
  url_type: string
}
interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}
interface RowItem {
  i: string[]
}
interface Item {
  item: string[]
}
@Component({
  selector: 'app-wishscope',
  templateUrl: './wishscope.component.html',
  styleUrls: ['./wishscope.component.css']
})
export class WishscopeComponent implements OnInit {
  chartOptions: any;
  someData:any [] = []
  rawData:Item[] = []
  // dataForDisplay
  header:any [] = []
  dataArray:any [] = []
  cases: CountryStatus[] = [];
  seriesData: Series[] = []
  legend:string[] = []
  datasets:any = []
  dataFiles: Resource []= []
  datasetForm = new FormGroup({
    dataset: new FormControl(),
    datafile: new FormControl()
  })
  seriesSetForm = new FormGroup({
    xAxisValues: new FormControl(),
    data: new FormControl(),
    type: new FormControl()
  })
  topForm = new FormGroup({
    dataset: new FormControl(),
    dataFIle: new FormControl()
  })
  page = 1;
  pageSize = 10;
  collectionSize:number = this.dataArray.length;
  countries: Country[] = [];
  constructor(private appService: DatasetService) { 
    this.refreshCountries()
  }

  ngOnInit(): void {
    this.getCsv()
    this.getListOfDatasets()
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
    this.appService.getAnotherCsv('').subscribe((dat:any) => {
      console.log(dat);
      
    })
    this.appService.viewCsv('').subscribe((data: any) => {
      const list = data.split('\n')
      list.forEach( (e: any) => {
        this.someData.push(e)
      })
      const header = this.someData.shift();
      this.header = header.split(',')
      const firstArr: any[] = []
      // this.dataArray.push()
      for(let i = 0; i<this.header.length; i++){
        // this.dataArray.push(i)
        let name:any []= []
        this.someData.forEach((e: any) => {
          name.push(e.split(',')[i])
        })
        this.dataArray.push(name)
      }
      this.refreshCountries()
      
      // this.setOptions();
    })
  }
  // onChangeCountry() {
  //   this.appService.getCasesByCountry(this.selectedCountry).subscribe(cases => {
  //     this.cases = cases;
  //     this.setOptions();
  //   });
  // }
  setSeries(){
    // formdata multiple indexes
    this.seriesData.push({name: this.header[0], type: 'bar', data: this.dataArray[0]})
  }
  setOptions() {
    let xAxis = this.dataArray[this.seriesSetForm.value.xAxisValues]
    let data = this.seriesSetForm.value.data
    let type = this.seriesSetForm.value.type
    console.log(this.seriesSetForm);
    
    this.seriesSetForm.value.data.forEach((e:any) => {
      // this.legend = []
      // this.seriesData = []
      this.seriesData.push({
        name: this.header[e],
        type: type,
        data: this.dataArray[e]
      })
      this.legend.push(this.header[e])
    })
    
    
    this.chartOptions= {
      title: {
        text: 'COVID-19 STATUS CHART',
      },
      legend: {
        data: this.legend
      },
      tooltip: {
      },
      xAxis: {
        data: xAxis,
      },
      yAxis: {
        type: 'value'
      },
      series: this.seriesData
    };
  }
  refreshCountries() {
    this.someData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize).forEach((e: any) => {
      this.rawData.push(e.split(','))
    })
  }
  // this.countryCasesChartOptions = {
  //   title: {
  //     text: 'COVID-19 STATUS CHART',
  //   },
  //   legend: {
  //     data: ['Confirmed', 'Recovered', 'Deaths']
  //   },
  //   tooltip: {
  //   },
  //   xAxis: {
  //     data: this.cases.map(c => new Date(c.Date).toLocaleDateString()),
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [{
  //     name: 'Confirmed',
  //     type: 'line',
  //     data: this.cases.map(c => c.Confirmed),
  //   },
  //   {
  //     name: 'Recovered',
  //     type: 'line',
  //     data: this.cases.map(c => c.Recovered),
  //   },
  //   {
  //     name: 'Deaths',
  //     type: 'line',
  //     data: this.cases.map(c => c.Deaths),
  //   },
  //   ]
  // };
}
