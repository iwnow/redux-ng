import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FacadeComponent } from './components/facade/facade.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [{
  path: '',
  component: FacadeComponent,
  canActivate: [IsAuthenticatedGuard],
  children: [{
    path: 'counter',
    loadChildren: 'app/features/counter/counter.module#CounterModule'
  }]
}, {
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRouteModule { }
