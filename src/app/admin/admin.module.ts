import { RouterModule, Routes } from '@angular/router';
import { DonutService } from './services/donut.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

//Components
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';


//services

//guards

//directives

export const routes: Routes = [
  {path: 'donuts',component: DonutListComponent},
  {path: 'donuts/new',component: DonutSingleComponent, data:{isEdit:false}},
  {path: 'donuts/:id',component: DonutSingleComponent,data:{isEdit:true}},
  {path: '',pathMatch: 'full',redirectTo: 'donuts'}
]; //routes definition

@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent
  ],
  imports: [
    CommonModule, FormsModule, HttpClientModule, RouterModule.forChild(routes)
  ],
  providers: [DonutService]
})
export class AdminModule { }
