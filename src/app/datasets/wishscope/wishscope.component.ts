import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DatasetService } from '../../services/datasets-services.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { Dataset } from '../../interfaces/dataset'
import { Resource } from '../../interfaces/resource'
import { Series } from '../../interfaces/Series'
import { CountryStatus } from '../../interfaces/CountryStatus'
import { ActivatedRoute } from '@angular/router'


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
  // pie
  chartOptions: any;
  displayPie:boolean = false
  pieChartForm = new FormGroup({
    column: new FormControl()
  })

  // bar
  displayBar: boolean = false

  lat = 21.3069;
  lng = -157.8583;
  mapType = 'satellite';
  pieOptions: any
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
  // countries: Country[] = [];
  constructor(private appService: DatasetService, private route: ActivatedRoute) { 
    this.refreshCountries()
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
    this.appService.viewCsv(this.datasetForm.value.datafile).subscribe((data: any) => {
      this.load = false
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
      this.collectionSize = this.someData.length;
      this.refreshCountries()
      // this.generatePieCart()
      // this.setOptions();
    })
  }
  // onChangeCountry() {
  //   this.appService.getCasesByCountry(this.selectedCountry).subscribe(cases => {
  //     this.cases = cases;
  //     this.setOptions();
  //   });
  // }
  setCsvFile(){
    this.header = []
    this.rawData = []
    this.someData = []
    this.dataArray = []
    this.getCsv()
  }
  setSeries(){
    // formdata multiple indexes
    this.seriesData.push({name: this.header[0], type: 'bar', data: this.dataArray[0]})
  }
  setOptions() {
    this.seriesData = []
    let xAxis = this.dataArray[this.seriesSetForm.value.xAxisValues]
    let data = this.seriesSetForm.value.data
    let type = this.seriesSetForm.value.type
    
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
    console.log(this.chartOptions)
  }
  refreshCountries() {
    this.rawData = []
    this.someData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize).forEach((e: any) => {
      this.rawData.push(e.split(','))
    })
    console.log(this.page);
    console.log(this.pageSize);
  }
  generatePieCart() {
    let uniqueCount = this.dataArray[this.pieChartForm.value.column];
    let count:any ={};
    let pieData:Pie[] =[]
    uniqueCount.forEach((i:any) => {
        count[i] = (count[i]||0) + 1;
    });
    for (const key in count) {
      console.log(key);
      pieData.push({name:key,value:count[key]})
    }
    // console.log(pie);
    this.pieOptions = {
      title: {
        text: this.header[this.pieChartForm.value.column],
        subtext: 'Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  setChart() {
    console.log(this.chartForm.value.chart);
    
    if(this.chartForm.value.chart == 'pie'){
      this.displayPie = true
    } else if(this.chartForm.value.chart == 'Bar/Line') {
      this.displayBar = true
    }
  }
}
