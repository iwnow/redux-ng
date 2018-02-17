import { Injectable, Inject } from '@angular/core';
import { ModuleStoreDefinitionBase } from '../base';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import * as tok from '../core.di-tokens';
import { ReduxEpicCoreService } from '../redux/services/redux-epic-core.service';

@Injectable()
export class ModuleStoreCoreService {
  protected moduleStoreDefs: Map<
    string,
    {
      storeDef: ModuleStoreDefinitionBase;
      store: ObservableStore<any>;
    }
  > = new Map();

  constructor(
    private rootStore: NgRedux<any>,
    @Inject(tok.MODULE_STORE_BASE_PATH) private storeBasePath: string,
    private rootEpic: ReduxEpicCoreService
  ) {}

  registerModuleStore(storeDef: ModuleStoreDefinitionBase) {
    if (!storeDef) return this;
    if (!storeDef.storeKey) throw new Error(`'storeKey' is not defined`);

    if (this.moduleStoreDefs.has(storeDef.storeKey))
      throw new Error(`duplicate module store key '${storeDef.storeKey}'`);

    const store = this.configureSubStore(storeDef);
    this.configureEpic(storeDef);

    this.moduleStoreDefs.set(storeDef.storeKey, { storeDef, store });

    return this;
  }

  getModuleStore<StoreType>(
    storeDef: ModuleStoreDefinitionBase
  ): ObservableStore<StoreType> {
    if (!storeDef || !storeDef.storeKey) return null;

    const def = this.moduleStoreDefs.get(storeDef.storeKey);

    return def && def.store;
  }

  /** configure module sub store in root state*/
  protected configureSubStore(
    storeDef: ModuleStoreDefinitionBase
  ): ObservableStore<any> {
    if (!storeDef) return null;

    return this.rootStore.configureSubStore(
      [this.storeBasePath, storeDef.storeKey],
      storeDef.reducer
    );
  }

  protected configureEpic(storeDef: ModuleStoreDefinitionBase) {
    if (!storeDef) return;

    this.rootEpic.registerEpic(storeDef.epic);
  }
}
