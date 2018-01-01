import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgReduxFormsComponent } from './components/ng-redux-forms/ng-redux-forms.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: NgReduxFormsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrFormsRoutingModule { }
