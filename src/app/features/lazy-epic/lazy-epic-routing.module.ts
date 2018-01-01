import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyEpicDemoComponent } from './components/lazy-epic-demo/lazy-epic-demo.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LazyEpicDemoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyEpicRoutingModule { }
