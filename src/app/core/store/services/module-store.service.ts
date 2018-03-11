import { Injectable, Inject } from '@angular/core';
import { ModuleStoreDefinitionBase } from '../contracts';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import * as tok from '../di-tokens';
import { StoreEpicService } from './store-epic.service';

@Injectable()
export class ModuleStoreService {
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
    @Inject(tok.MODULE_STORE_INIT_ACTION) private moduleStoreInitAction,
    private rootEpic: StoreEpicService
  ) {}

  /**register module store by definition
   * only once call per module definition
   */
  registerModuleStore(storeDef: ModuleStoreDefinitionBase) {
    if (!storeDef || !storeDef.storeKey)
      throw new Error(
        `Property 'storeKey' of ModuleStoreDefinition is not defined`
      );

    if (this.moduleStoreDefs.has(storeDef.storeKey))
      throw new Error(`duplicate module store key '${storeDef.storeKey}'`);

    const store = this.configureSubStore(storeDef);
    this.configureEpic(storeDef);

    this.moduleStoreDefs.set(storeDef.storeKey, { storeDef, store });

    // initalize event
    store.dispatch({
      type: this.moduleStoreInitAction
    });
    return this;
  }

  /**get module store by definition */
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
      (state, action) => {
        switch (action.type) {
          case this.moduleStoreInitAction:
            return storeDef.initialState;
          default:
            return storeDef.reducer && storeDef.reducer(state, action);
        }
      }
    );
  }

  protected configureEpic(storeDef: ModuleStoreDefinitionBase) {
    if (!storeDef) return;

    this.rootEpic.registerEpic(storeDef.epic);
  }
}
