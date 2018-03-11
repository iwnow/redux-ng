import { NgModule, SkipSelf, Optional, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SERVICE_PROVIDERS,
  ExceptionHandlerCoreService,
  ModuleRegistrationCoreService
} from './services';
import {
  DEFINITION_PROVIDERS,
  CoreModuleDefinitionFactory
} from './definitions';
import { LoggerModule } from './diagnostics/logger';
import { StoreModule } from './store';
import { MatDialogModule } from '@angular/material';
import { ModalDialogModule } from '@vh/core/modal';

@NgModule({
  imports: [LoggerModule, StoreModule, ModalDialogModule],
  exports: [],
  providers: [
    ...SERVICE_PROVIDERS,
    ...DEFINITION_PROVIDERS,
    {
      provide: ErrorHandler,
      useClass: ExceptionHandlerCoreService
    }
  ]
})
export class CoreModule {
  constructor(
    // import CoreModule only ones in app
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    coreMdf: CoreModuleDefinitionFactory,
    moduleReg: ModuleRegistrationCoreService
  ) {
    if (parentModule) {
      throw new Error('duplicate import of CoreModule!');
    }
    moduleReg.registerModuleFactory(coreMdf);
  }
}
