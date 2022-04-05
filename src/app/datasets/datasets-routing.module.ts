import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRequestComponent } from './data-request/data-request.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  { path: '', component: DatasetsComponent },
  { path: 'datasetdetails', component: DatasetDetailsComponent},
  { path: 'datasetdetails/datasetrequest', component: DataRequestComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
     
  ]
})
export class DatasetsRoutingModule { }
