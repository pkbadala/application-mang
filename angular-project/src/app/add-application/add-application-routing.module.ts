import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApplicationComponent } from './add-application.component';

const routes: Routes = [
  {
    path: '',
    component: AddApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddApplicationRoutingModule { }