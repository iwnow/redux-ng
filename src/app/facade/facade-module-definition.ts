import { Injectable } from '@angular/core';

import { ModuleDefinitionBase } from '@vh/core/contracts';
import { ModuleStoreDefinitionFactoryBase } from '@vh/core/store/contracts';
import { FacadeModuleStoreDefinitionFactory } from './facade-module-store-definition-factory';

@Injectable()
export class FacadeModuleDefinition extends ModuleDefinitionBase {
  get name() {
    return 'FacadeModule';
  }
  get description() {
    return `Реализация каркаса приложения`;
  }
  get version() {
    return '0.0.1';
  }
  get storeDefinitionFactory() {
    return this.facadeStoreDefFactory;
  }

  constructor(
    private facadeStoreDefFactory: FacadeModuleStoreDefinitionFactory
  ) {
    super();
  }
}
