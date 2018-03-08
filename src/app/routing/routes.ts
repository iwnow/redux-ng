import { Routes } from '@angular/router';
import { DashboardComponent } from '@vh/features/dashboard';
import { AllComponent } from '@vh/features/bulma/components/all/all.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'bulma',
    component: AllComponent
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
];

export default routes;
