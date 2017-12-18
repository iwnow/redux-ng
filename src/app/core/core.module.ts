import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FacadeComponent } from './components/facade/facade.component';
import { ReduxModule } from './redux/redux.module';
import { CoreRouteModule } from './/core-route.module';

import {
  MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule
} from '@angular/material';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ReduxEpicService } from './services/redux-epic.service';

@NgModule({
  imports: [
    CommonModule,
    ReduxModule,
    CoreRouteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [LoginComponent, FacadeComponent],
  exports: [
    CoreRouteModule
  ],
  providers: [IsAuthenticatedGuard, ReduxEpicService]
})
export class CoreModule { }
