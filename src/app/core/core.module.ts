import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FacadeComponent } from './components/facade/facade.component';
import { ReduxCoreModule } from './redux/redux.module';
import { CoreRouteModule } from './/core-route.module';

import {
  MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatIconModule,
  MatToolbarModule, MatSidenavModule, MatMenuModule, MatSliderModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LoggerCoreService, ILog, LogType } from './services/logger-core.service';

import * as tokens from './core.di-tokens';
import { AppSettingsCoreService } from './services/app-settings-core.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRouteModule,
    ReduxCoreModule,
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
    FlexLayoutModule,
    MatSliderModule
  ],
  declarations: [
    LoginComponent,
    FacadeComponent,
    DashboardComponent
  ],
  exports: [
    CoreRouteModule,
    ReduxCoreModule,
    MatSliderModule // hack angular material in lazy module for animation slider
  ],
  providers: [
    { provide: tokens.MODULE_NAME, useValue: 'CoreModule' },
    { provide: tokens.REDUX_LAZY_BASE_PATH, useValue: 'lazy' },
    IsAuthenticatedGuard,
    LoggerCoreService,
    AppSettingsCoreService
  ]
})
export class CoreModule {
  private logger: ILog;

  constructor(
    // import CoreModule only one time in app module
    @Optional() @SkipSelf() parentModule: CoreModule,
    private loggerService: LoggerCoreService
  ) {
    this.logger = loggerService.createLogger(CoreModule.name);
    if (parentModule) {
      const err = new Error('duplicate import of CoreModule!');
      this.logger.log(LogType.error, err);
      throw err;
    }
  }
}
