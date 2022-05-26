import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home/home.component';
import { MapEngineCountriesComponent } from './map-engine-countries/map-engine-countries.component';
import { ResorcePortalComponent } from './resorce-portal.component';
import { ResourceContentComponent } from './resource-content/resource-content.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ResourceManageOneComponent } from './resource-manage-one/resource-manage-one.component';
import { ResourceManagerHomeComponent } from './resource-manager-home/resource-manager-home.component';
import { SdpHomeComponent } from './sdp-home/sdp-home.component';
import { SdpManageComponent } from './sdp-manage/sdp-manage.component';
import { ResourcemanageComponent } from './resourcemanage/resourcemanage.component'; 

const routes: Routes = [
  { path: '', component: ResorcePortalComponent, children: [
    {path: '', component: HomeComponent },
    {path: 'resourceshome', component: ResourceManagerHomeComponent },
    {path: 'resourcedetails', component: ResourceDetailsComponent },
    {path: 'manage', component: ResourcemanageComponent },
    {path: 'manageresources', component: ResourceManageOneComponent },
    {path: 'content', component: ResourceContentComponent },
    {path: 'sdp', component: SdpHomeComponent},
    {path: 'sdp/manage', component: SdpManageComponent},
    {path: 'map/countries', component: MapEngineCountriesComponent}
  ] },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // HeaderComponent
  ],
  exports: [RouterModule]
})
export class ResorcePortalRoutingModule { }
