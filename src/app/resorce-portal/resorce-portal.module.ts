import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { ResorcePortalRoutingModule } from './resorce-portal-routing.module';
import { ResorcePortalComponent } from './resorce-portal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PortalheaderComponent } from './portalheader/portalheader.component';
import { PortalfooterComponent } from './portalfooter/portalfooter.component';
import { HomeComponent } from './home/home.component';
import { ResourceManagerHomeComponent } from './resource-manager-home/resource-manager-home.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ResourceManageOneComponent } from './resource-manage-one/resource-manage-one.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourceContentComponent } from './resource-content/resource-content.component';
import { SdpHomeComponent } from './sdp-home/sdp-home.component';
import { SdpManageComponent } from './sdp-manage/sdp-manage.component';
import { MapEngineCountriesComponent } from './map-engine-countries/map-engine-countries.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { ResourcemanageComponent } from './resourcemanage/resourcemanage.component';

@NgModule({
  declarations: [
    ResorcePortalComponent,
    SidebarComponent,
    PortalheaderComponent,
    PortalfooterComponent,
    HomeComponent,
    ResourceManagerHomeComponent,
    ResourceDetailsComponent,
    ResourceManageOneComponent,
    ResourceContentComponent,
    SdpHomeComponent,
    SdpManageComponent,
    MapEngineCountriesComponent,
    ResourcemanageComponent,
  ],
  imports: [
    CommonModule,
    ResorcePortalRoutingModule,
    NgbModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    SharedModule
  ]
})
export class ResorcePortalModule { }
