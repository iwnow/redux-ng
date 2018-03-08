import { Injectable } from '@angular/core';

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

@Injectable()
export class FacadeModuleStoreDefinition extends ModuleStoreDefinitionBase {
  get storeKey() {
    return 'facade';
  }

  get epic(): AnyEpic {
    return mergeEpic(this.appUserDuck.epic, this.loginFormDuck.epic);
  }

  get reducer(): (state: IFacadeState, action: AnyAction) => any {
    return mergeReducers<IFacadeState>({
      appUser: this.appUserDuck.reducer,
      loginForm: this.loginFormDuck.reducer,
      styleTheme: null
    });
  }

  constructor(
    protected appUserDuck: AppUserDuckService,
    protected loginFormDuck: LoginFormDuckService
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
