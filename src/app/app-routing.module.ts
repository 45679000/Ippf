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
import { ResourceManagerHomeComponent } from './resorce-portal/resource-manager-home/resource-manager-home.component';
import { ResourceDetailsComponent } from './resorce-portal/resource-details/resource-details.component';
import { ResourceManageOneComponent } from './resorce-portal/resource-manage-one/resource-manage-one.component';
import { ResourceContentComponent } from './resorce-portal/resource-content/resource-content.component';
import { WishscopeComponent } from './datasets/wishscope/wishscope.component';
import { DataRequestComponent } from './datasets/data-request/data-request.component'
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  // {
  //   path: '*', 
  //   redirectTo: 'home' 
  // },
  // {
  //   path: '**', 
  //   redirectTo: 'home' 
  // },
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: 'registration', 
    component: RegisterComponent,
    // canActivate: [!AuthGuard] 
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
    component: PasswordChangeComponent,
    // canActivate: [AuthGuard] 
  },
  { 
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard] 
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
     pathMatch: 'prefix',
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
  },
  {
    path: 'resources/manage', 
    component: ResourceManagerHomeComponent  ,
    canActivate: [AuthGuard] 
 },
 {
  path: 'resources/details', 
  component: ResourceDetailsComponent ,
  canActivate: [AuthGuard] 
},
{
  path: 'resource/manage', 
  component: ResourceManageOneComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'resource/content', 
  component: ResourceContentComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'wishscope', 
  component: WishscopeComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'request/:id/:name',
  component: DataRequestComponent,
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
