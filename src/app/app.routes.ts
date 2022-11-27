import { DonutService } from './admin/services/donut.service';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {Routes } from '@angular/router';

export const AppRoutes:Routes=[
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.routes').then(x=>x.AdminRoutes),
    providers:[importProvidersFrom(HttpClientModule),DonutService]
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'admin'
  },{
    path:'**',
    redirectTo:'admin'
    //aqui debería de ir una pagina de error
  }

]; //routes definition
