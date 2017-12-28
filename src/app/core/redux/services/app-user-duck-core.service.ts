import { Injectable, Inject } from '@angular/core';
import { Action } from 'redux';
import { ReduxActionsCoreService, IActionFabric } from './redux-actions-core.service';
import { IAppUserState } from '../models/app-user';

import tokens from '../../core.di-tokens';
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
    @Inject(tokens.CORE_MODULE_NAME)
    coreModuleName: string
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
    return [
      this.actions.APP_USER_LOGIN,
      this.actions.APP_USER_LOGOUT
    ];
  }

  getEpics() {
    return [];
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

}
