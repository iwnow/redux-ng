import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FacadeComponent } from './components/facade/facade.component';
import { ReduxCoreModule } from './redux/redux.module';
import { CoreRouteModule } from './/core-route.module';

import {
  MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatIconModule,
  MatToolbarModule, MatSidenavModule, MatMenuModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LoggerCoreService } from './services/logger-core.service';

import tokens from './core.di-tokens';

@NgModule({
  imports: [
    CommonModule,
    ReduxCoreModule,
    CoreRouteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent, FacadeComponent],
  exports: [
    CoreRouteModule
  ],
  providers: [
    IsAuthenticatedGuard,
    LoggerCoreService,
    { provide: tokens.CORE_MODULE_NAME, useValue: 'app/core' }
  ]
})
export class CoreModule { }
