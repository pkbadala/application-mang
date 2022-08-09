import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class WelcomeModule { }
