import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';
import { PortalFooterComponent } from './portal-footer/portal-footer.component';


@NgModule({
  declarations: [
    NavbarComponent,
    TopHeaderComponent,
    FooterComponent,
    PortalFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TopHeaderComponent,
    FooterComponent,
    PortalFooterComponent
  ]
})
export class SharedModule { }
