import { Injectable } from '@angular/core';

import {
  ModuleStoreDefinitionFactoryBase,
  ModuleStoreDefinitionBase
} from '@vh/core/store/contracts';
import { FacadeModuleStoreDefinition } from './facade-module-store-definition';

@Injectable()
export class FacadeModuleStoreDefinitionFactory
  implements ModuleStoreDefinitionFactoryBase {
  createModuleStoreDefinition(): ModuleStoreDefinitionBase {
    return this.storeDef;
  }

  constructor(private storeDef: FacadeModuleStoreDefinition) {}
}
