import { Injectable } from '@angular/core';
import { ModuleStoreDefinitionBase } from '@vh/core/store/contracts';

@Injectable()
export class CoreModuleStoreDefinition extends ModuleStoreDefinitionBase {
  get storeKey() {
    return 'core';
  }

  get epic() {
    return null;
  }

  get reducer() {
    return null;
  }

  get initialState() {
    return null;
  }

  constructor() {
    super();
  }
}
