import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRequestComponent } from './data-request/data-request.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  { path: '/da', component: DatasetsComponent },
  { path: '/re', component: DatasetDetailsComponent},
  { path: '', component: DataRequestComponent}
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
