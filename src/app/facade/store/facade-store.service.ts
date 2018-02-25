import { Injectable } from '@angular/core';
import { ModuleStoreService, ActionService } from '../../core/store/services';
import { FacadeModuleStoreDefinition } from './facade-store.definition';
import { IFacadeState } from '../store/model';
import { ActionFabric } from '../../core/store/contracts';

@Injectable()
export class FacadeStoreService {
  constructor(
    protected moduleStore: ModuleStoreService,
    protected storeDef: FacadeModuleStoreDefinition,
    protected actions: ActionService
  ) {}

  get store() {
    return this.moduleStore.getModuleStore<IFacadeState>(this.storeDef);
  }

  createActionScopeFabric(scope: string): ActionFabric {
    return (action: string) => `${this.storeDef.storeKey}/${scope}/${action}`;
  }

  registerActions(...actions: string[]) {
    (actions || []).forEach(act => this.actions.registerAction(act));
  }
}
