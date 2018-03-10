import { Injectable, Inject } from '@angular/core';

import {
  ModuleStoreDefinitionBase,
  AnyEpic,
  AnyAction
} from '@vh/core/store/contracts';
import { mergeEpic, mergeReducers } from '@vh/core/store/utils';
import {
  IFacadeState,
  AppUserDuckService,
  LoginFormDuckService
} from './store';
import { MODULE_STORE_INIT_ACTION } from '@vh/core/store';
import { StoreLocalStorageService } from '@vh/core/store/services';
import { ignoreElements, tap } from 'rxjs/operators';

@Injectable()
export class FacadeModuleStoreDefinition extends ModuleStoreDefinitionBase {
  get storeKey() {
    return 'facade';
  }

  get epic(): AnyEpic {
    return mergeEpic(this.appUserDuck.epic, this.loginFormDuck.epic);
  }

  get reducer(): (state: IFacadeState, action: AnyAction) => any {
    return (state, action) => {
      switch (action.type) {
        case this.moduleInitAction:
          return this.localStorage.getState(this.storeKey);
        default:
          return mergeReducers<IFacadeState>({
            appUser: this.appUserDuck.reducer,
            loginForm: this.loginFormDuck.reducer,
            styleTheme: null
          })(state, action);
      }
    };
  }

  constructor(
    protected appUserDuck: AppUserDuckService,
    protected loginFormDuck: LoginFormDuckService,
    @Inject(MODULE_STORE_INIT_ACTION) protected moduleInitAction: string,
    protected localStorage: StoreLocalStorageService
  ) {
    super();
    this.appUserDuck = this.appUserDuck.withActionScope(
      this.createActionScope('app-user')
    );
    this.loginFormDuck = this.loginFormDuck.withActionScope(
      this.createActionScope('login-form')
    );
  }
}
