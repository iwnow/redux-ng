import { Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { Injectable } from '@angular/core';

import { ModuleStoreDefinitionBase } from '../core/store/contracts';
import { ModuleDefinitionBase } from '../core/contracts';
import { FacadeModuleStoreDefinition } from './store/facade-store.definition';

// .msd - Module Store Definition
@Injectable()
export class FacadeModuleDefinition extends ModuleDefinitionBase {
  get name() {
    return 'FacadeModule';
  }
  get description() {
    return `Implements main application pages: Login, Workspace etc...`;
  }
  get version() {
    return '0.0.1';
  }
  get storeDefinition(): ModuleStoreDefinitionBase {
    return this.storeDef;
  }

  constructor(protected storeDef: FacadeModuleStoreDefinition) {
    super();
  }
}
