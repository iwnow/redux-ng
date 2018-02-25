import { NgModule, SkipSelf, Optional, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import * as tokens from './core.di-tokens';
import { AppSettingsCoreService } from './services/app-settings-core.service';
import { ExceptionHandlerCoreService } from './services/exception-handler-core.service';
import { ModuleRegistrationCoreService } from './services/module-registration-core.service';
import {
  LoggerService,
  ILog,
  LoggerModule,
  LogType
} from './diagnostics/logger';

@NgModule({
  imports: [
    LoggerModule
    // FormsModule,
    // ReactiveFormsModule,
    // MatCardModule,
    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatMenuModule,
    // FlexLayoutModule,
    // MatSliderModule
  ],
  exports: [],
  providers: [
    { provide: tokens.MODULE_NAME, useValue: 'CoreModule' },
    {
      provide: ErrorHandler,
      useClass: ExceptionHandlerCoreService
    },
    AppSettingsCoreService,
    ExceptionHandlerCoreService,
    ModuleRegistrationCoreService
  ]
})
export class CoreModule {
  private logger: ILog;

  constructor(
    // import CoreModule only one time in app module
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    private loggerService: LoggerService
  ) {
    this.logger = loggerService.createLogger(CoreModule.name);
    if (parentModule) {
      const err = new Error('duplicate import of CoreModule!');
      this.logger.log(LogType.error, err);
      throw err;
    }
  }
}
