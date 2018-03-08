import { Injectable } from '@angular/core';
import { ModuleStoreService } from '@vh/core/store/services';
import { FacadeModuleStoreDefinition } from '@vh/facade/facade-module-store-definition';
import { IFacadeState } from '@vh/facade/store';

@Injectable()
export class FacadeStoreService {
  get store() {
    return this.moduleStoreSrv.getModuleStore<IFacadeState>(
      this.facadeStoreDef
    );
  }

  get state() {
    return this.moduleStoreSrv
      .getModuleStore<IFacadeState>(this.facadeStoreDef)
      .getState();
  }

  constructor(
    protected moduleStoreSrv: ModuleStoreService,
    protected facadeStoreDef: FacadeModuleStoreDefinition
  ) {}
}
