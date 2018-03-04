import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  FacadeComponent,
  LoginComponent,
  FacadeAuthenticationGuard
} from '../facade';
import { DashboardComponent } from '../features/dashboard';
import childRoutes from './routes';

const rootRoutes: Routes = [
  {
    path: '',
    component: FacadeComponent,
    canActivate: [FacadeAuthenticationGuard],
    children: childRoutes
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {}
