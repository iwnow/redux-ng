import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/do';

import { ReduxActionsCoreService, IActionFabric } from './redux-actions-core.service';
import { IAppUserState } from '../models/app-user';
import * as tokens from '../../core.di-tokens';
import { DuckCoreBase } from './duck-core-base';

export type IAppUserLoginAction = Action & {
  user: IAppUserState
};

export type IAppUserLogoutAction = Action;

@Injectable()
export class AppUserDuckCoreService extends DuckCoreBase {

  private actions = Object.freeze({
    APP_USER_LOGIN: this.actionFabric('APP_USER_LOGIN'),
    APP_USER_LOGOUT: this.actionFabric('APP_USER_LOGOUT')
  });

  constructor(
    actionService: ReduxActionsCoreService,
    @Inject(tokens.MODULE_NAME) coreModuleName: string,
    private router: Router
  ) {
    super(actionService, `${coreModuleName}/app-user`);
  }

  createActionAppUserLogin(user: IAppUserState): IAppUserLoginAction {
    return {
      type: this.actions.APP_USER_LOGIN,
      user: user
    };
  }

  createActionAppUserLogout(): IAppUserLogoutAction {
    return {
      type: this.actions.APP_USER_LOGOUT
    };
  }

  getActions(): string[] {
    return Object.values(this.actions);
  }

  getEpics() {
    return [
      this.logoutRequestEpic
    ];
  }

  readonly reducer = (state: IAppUserState = null, action) => {
    switch (action.type) {
      case this.actions.APP_USER_LOGIN:
        return action.user;
      case this.actions.APP_USER_LOGOUT:
        return null;
      default:
        break;
    }
    return state;
  }

  /**epics */
  readonly logoutRequestEpic = (action$: ActionsObservable<any>) => {
    return action$.ofType(this.actions.APP_USER_LOGOUT)
      .do(action => this.router.navigate(['/login']))
      .ignoreElements();
  }

}
