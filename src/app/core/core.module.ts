import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FacadeComponent } from './components/facade/facade.component';
import { ReduxModule } from './redux/redux.module';
import { CoreRouteModule } from './/core-route.module';

@NgModule({
  imports: [
    CommonModule,
    ReduxModule,
    CoreRouteModule,
    FormsModule
  ],
  declarations: [LoginComponent, FacadeComponent],
  exports: [
    CoreRouteModule
  ]
})
export class CoreModule { }
