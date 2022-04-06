import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from "./authentication/register/register.component";
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { PasswordChangeComponent } from './authentication/password-change/password-change.component'; 
import { AccountSettingsComponent } from './authentication/account-settings/account-settings.component';
const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'registration', 
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'faqs',
    component: FaqComponent
  },
  {
    path: 'change-password',
    component: PasswordChangeComponent
  },
  { 
    path: 'account-settings',
    component: AccountSettingsComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
     path: 'home', 
     loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
     canActivate: [AuthGuard] 
  },
  {
     path: 'datasets', 
     loadChildren: () => import('./datasets/datasets.module').then(m => m.DatasetsModule) ,
     canActivate: [AuthGuard] 
  },
  {
     path: 'resources', 
     loadChildren: () => import('./resorce-portal/resorce-portal.module').then(m => m.ResorcePortalModule),
     data: {
       footerDisp: false,
       headerDisp: false
     } ,
     canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
