import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  FacadeComponent,
  LoginComponent,
  FacadeAuthenticationGuard
} from '../facade';
import { DashboardComponent } from '../features/dashboard';

const routes: Routes = [
  {
    path: '',
    component: FacadeComponent,
    canActivate: [FacadeAuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      }
      // , {
      //   path: 'counter',
      //   loadChildren: 'app/features/counter/counter.module#CounterModule'
      // }, {
      //   path: 'lazy-epic',
      //   loadChildren: 'app/features/lazy-epic/lazy-epic.module#LazyEpicModule'
      // }, {
      //   path: 'ngr-forms',
      //   loadChildren: 'app/features/ngr-forms/ngr-forms.module#NgrFormsModule'
      // }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
