import { Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { Injectable } from '@angular/core';

import { ModuleStoreDefinitionBase } from '../core/store/contracts';
import { ModuleDefinitionBase } from '../core/contracts';
import { FacadeModuleStoreDefinition } from './store/facade-store.definition';
import { ModuleRegistrationCoreService } from '../core';
import { IFacadeState } from './store/model';

// .msd - Module Store Definition
@Injectable()
export class FacadeModuleService extends ModuleDefinitionBase {
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
  get store() {
    return this.moduleRegistry.getModuleStore<IFacadeState>(this);
  }
  get state() {
    const store = this.store;
    return store && store.getState();
  }

  constructor(
    protected storeDef: FacadeModuleStoreDefinition,
    protected moduleRegistry: ModuleRegistrationCoreService
  ) {
    super();
  }
}
