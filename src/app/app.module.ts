import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from "./authentication/authentication.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { AccountSettingsComponent } from './authentication/account-settings/account-settings.component';
// import { PasswordChangeComponent } from './authentication/password-change/password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    MenuComponent,
    ErrorPageComponent,
    
    // AccountSettingsComponent,
    // PasswordChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
