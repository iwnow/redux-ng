import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'redux';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { ignoreElements, map } from 'rxjs/operators';

import { IAppUserState } from './model/app-user';
import { FacadeStoreService } from './facade-store.service';
import { ActionFabric, AnyEpic } from '../../core/store/contracts';

export type IAppUserLoginAction = Action & {
  user: IAppUserState;
};

@Injectable()
export class AppUserStoreService {
  protected actionFabric: ActionFabric;
  protected actions: {
    login;
    logout;
  };

  constructor(protected router: Router, protected facade: FacadeStoreService) {
    this.createActions();
  }

  protected createActions() {
    this.actionFabric = this.facade.createActionScopeFabric('app-user');
    this.actions = Object.freeze({
      login: this.actionFabric('login'),
      logout: this.actionFabric('logout')
    });
    this.facade.registerActions(...Object.values(this.actions));
  }

  appUserLogin(user: IAppUserState): IAppUserLoginAction {
    return {
      type: this.actions.login,
      user: user
    };
  }

  appUserLogout(): Action {
    return {
      type: this.actions.logout
    };
  }

  get epic() {
    return combineEpics(this.logoutEpic);
  }

  get reducer() {
    return (state: IAppUserState = null, action) => {
      switch (action.type) {
        case this.actions.login:
          return action.user;
        case this.actions.logout:
          return null;
        default:
          break;
      }
      return state;
    };
  }

  /**epics */
  protected logoutEpic: AnyEpic = action$ => {
    return action$.ofType(this.actions.logout).pipe(
      map(_ => {
        this.router.navigate(['/login']);
        return _;
      }),
      ignoreElements()
    );
  };
}
