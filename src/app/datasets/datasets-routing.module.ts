import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRequestComponent } from './data-request/data-request.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  { path: '', component: DatasetsComponent },
  { path: 'dataset-details', component: DatasetDetailsComponent},
  { path: 'dataset-request', component: DataRequestComponent}
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
