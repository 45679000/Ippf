import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    TopHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TopHeaderComponent
  ]
})
export class SharedModule { }
