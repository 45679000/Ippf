import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from '../auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthenticationModule { }
