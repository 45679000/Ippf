import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from "./authentication/register/register.component";

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
