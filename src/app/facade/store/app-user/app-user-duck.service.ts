import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'redux';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { ignoreElements, map } from 'rxjs/operators';

import { IAppUserState } from '../model/app-user';
import {
  ActionFabric,
  AnyEpic,
  DuckServiceBase
} from '@vh/core/store/contracts';

export type IAppUserLoginAction = Action & {
  user: IAppUserState;
};

@Injectable()
export class AppUserDuckService extends DuckServiceBase {
  protected actions: {
    login;
    logout;
  };

  constructor(protected router: Router) {
    super();
  }

  withActionScope(scoper: (action: string) => string = a => a) {
    this.actions = Object.freeze({
      login: scoper('login'),
      logout: scoper('logout')
    });
    return this;
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
    return combineEpics(this.logoutEpic, this.loginEpic);
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
        this.router.navigateByUrl('/login');
        return _;
      }),
      ignoreElements()
    );
  };

  protected loginEpic: AnyEpic = action$ => {
    return action$.ofType(this.actions.login).pipe(
      map(_ => {
        this.router.navigateByUrl('/');
        return _;
      }),
      ignoreElements()
    );
  };
}
