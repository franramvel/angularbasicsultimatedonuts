import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

export const routes:Routes=[
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.module').then(x=>x.AdminModule)
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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
