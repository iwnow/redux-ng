import { Injectable } from '@angular/core';

import { ModuleStoreDefinitionFactoryBase } from '@vh/core/store/contracts';
import { CoreModuleStoreDefinition } from './core-module-store-definition';

@Injectable()
export class CoreModuleStoreDefinitionFactory
  implements ModuleStoreDefinitionFactoryBase {
  createModuleStoreDefinition() {
    return this.storeDef;
  }

  constructor(private storeDef: CoreModuleStoreDefinition) {}
}
