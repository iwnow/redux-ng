import { ModuleStoreDefinitionBase } from '../../core/store/contracts';
import { AnyAction, combineReducers, ReducersMapObject } from 'redux';
import { Epic, combineEpics } from 'redux-observable';
import { Injectable } from '@angular/core';
import { AppUserDuckService } from './app-user/app-user-duck.service';
import { IFacadeState } from './model';
import { combiner } from '../../core/store';
import { LoginFormDuckService } from './login-form/login-form-duck.service';

@Injectable()
export class FacadeModuleStoreDefinition extends ModuleStoreDefinitionBase {
  get storeKey() {
    return 'facade';
  }

  get epic(): Epic<AnyAction, any, any> {
    return combineEpics(this.appUserDuck.epic, this.loginFormDuck.epic);
  }

  get reducer(): (state: IFacadeState, action: AnyAction) => any {
    return combiner<IFacadeState>({
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
