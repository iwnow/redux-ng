import { Injectable } from '@angular/core';

import { ModuleDefinitionBase } from '@vh/core/contracts';
import { CoreModuleStoreDefinitionFactory } from './core-module-store-definition-factory';

@Injectable()
export class CoreModuleDefinition extends ModuleDefinitionBase {
  get name() {
    return 'CoreModule';
  }
  get description() {
    return `Ядро приложения`;
  }
  get version() {
    return '0.1.0';
  }
  get storeDefinitionFactory() {
    return this.coreSdf;
  }

  constructor(private coreSdf: CoreModuleStoreDefinitionFactory) {
    super();
  }
}
