import { NgModule, SkipSelf, Optional, ErrorHandler } from '@angular/core';

import { ExceptionHandlerCoreService } from './services/exception-handler-core.service';
import { ModuleRegistrationCoreService } from './services/module-registration-core.service';
import {
  LoggerService,
  ILog,
  LoggerModule,
  LogType
} from './diagnostics/logger';
import { StoreModule } from './store';

@NgModule({
  imports: [LoggerModule, StoreModule],
  exports: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ExceptionHandlerCoreService
    },
    ExceptionHandlerCoreService,
    ModuleRegistrationCoreService
  ]
})
export class CoreModule {
  private logger: ILog;

  constructor(
    // import CoreModule only ones in app
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
