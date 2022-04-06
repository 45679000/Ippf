import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from '../auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    PasswordChangeComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    PasswordChangeComponent,
    AccountSettingsComponent
  ]
})
export class AuthenticationModule { }
