import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsComponent } from './datasets.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DataRequestComponent } from './data-request/data-request.component';
// import { HeaderComponent } from '../home/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { UploadDatasetComponent } from './upload-dataset/upload-dataset.component';
import { WishscopeComponent } from './wishscope/wishscope.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetDetailsComponent,
    DataRequestComponent,
    UploadDatasetComponent,
    WishscopeComponent
  ],
  imports: [
    CommonModule,
    DatasetsRoutingModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    FormsModule,
    NgbPaginationModule, 
    NgbAlertModule

  ]
})
export class DatasetsModule { }
