import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsComponent } from './datasets.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DataRequestComponent } from './data-request/data-request.component';
// import { HeaderComponent } from '../home/header/header.component';


@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetDetailsComponent,
    DataRequestComponent
  ],
  imports: [
    CommonModule,
    DatasetsRoutingModule,
    NgbModule
    // HeaderComponent
  ]
})
export class DatasetsModule { }
