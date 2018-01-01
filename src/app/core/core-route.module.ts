import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FacadeComponent } from './components/facade/facade.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: FacadeComponent,
  canActivate: [IsAuthenticatedGuard],
  children: [{
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  }, {
    path: 'counter',
    loadChildren: 'app/features/counter/counter.module#CounterModule'
  }, {
    path: 'lazy-epic',
    loadChildren: 'app/features/lazy-epic/lazy-epic.module#LazyEpicModule'
  }, {
    path: 'ngr-forms',
    loadChildren: 'app/features/ngr-forms/ngr-forms.module#NgrFormsModule'
  }]
}, {
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRouteModule { }
