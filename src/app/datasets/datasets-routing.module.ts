import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataRequestComponent } from './data-request/data-request.component';
import { DatasetDetailsComponent } from './dataset-details/dataset-details.component';
import { DatasetsComponent } from './datasets.component';
import { UploadDatasetComponent } from './upload-dataset/upload-dataset.component';

const routes: Routes = [
  { path: '', component: DatasetsComponent },
  { path: 'dataset-details/:id', component: DatasetDetailsComponent },
  { path: 'dataset-upload', component: UploadDatasetComponent}
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
