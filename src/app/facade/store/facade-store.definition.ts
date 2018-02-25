import { ModuleStoreDefinitionBase } from '../../core/store/contracts';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { Epic, combineEpics } from 'redux-observable';
import { Injectable } from '@angular/core';
import { AppUserStoreService } from './app-user-store.service';
import { IFacadeState } from './model';
import { combiner } from '../../core/store';

@Injectable()
export class FacadeModuleStoreDefinition extends ModuleStoreDefinitionBase {
  get storeKey() {
    return 'facade';
  }

  get epic(): Epic<AnyAction, any, any> {
    return combineEpics(this.appUserStore.epic);
  }

  get reducer(): (state: IFacadeState, action: AnyAction) => any {
    return combiner<IFacadeState>({
      appUser: this.appUserStore.reducer,
      loginForm: null,
      styleTheme: null
    });
  }

  constructor(protected appUserStore: AppUserStoreService) {
    super();
  }
}
