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


@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetDetailsComponent,
    DataRequestComponent,
    UploadDatasetComponent
  ],
  imports: [
    CommonModule,
    DatasetsRoutingModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DatasetsModule { }
