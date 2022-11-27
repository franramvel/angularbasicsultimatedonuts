import { RouterModule, Routes } from '@angular/router';
import { DonutService } from './services/donut.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'



//services

//guards

//directives

export const AdminRoutes: Routes = [
  {path: 'donuts',loadComponent:()=> import('../admin/containers/donut-list/donut-list.component').then(x=>x.DonutListComponent)},
  {path: 'donuts/new',loadComponent:()=>  import('../admin/containers/donut-single/donut-single.component').then(x=>x.DonutSingleComponent), data:{isEdit:false}},
  {path: 'donuts/:id',loadComponent:()=>  import('../admin/containers/donut-single/donut-single.component').then(x=>x.DonutSingleComponent),data:{isEdit:true}},
  {path: '',pathMatch: 'full',redirectTo: 'donuts'}
]; //routes definition

