import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from "@angular/forms";
import { AddApplicationComponent } from './add-application.component';
import { AddApplicationRoutingModule } from './add-application-routing.module';

@NgModule({
  declarations: [AddApplicationComponent],
  imports: [
    CommonModule,
    AddApplicationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddApplicationModule { }
