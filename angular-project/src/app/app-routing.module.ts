import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'add-application', 
    loadChildren: () => import('./add-application/add-application.module').then(m => m.AddApplicationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
