import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Reducer } from 'redux';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map, catchError, mergeMap } from 'rxjs/operators';

import { AppUserStoreService } from './app-user-store.service';
import { ILoginFormState } from './model/login-form';
import { ActionFabric, AnyEpic } from '../../core/store/contracts';
import { FacadeStoreService } from './facade-store.service';

export interface ILoginFormRequestAction extends Action {
  login: string;
  password: string;
}

export interface ILoginFormRequestFailAction extends Action {
  loginError: string;
}

export interface ILoginFormRequestSuccessAction extends Action {
  login: string;
  name: string;
}

@Injectable()
export class LoginFormStoreService {
  protected actionFabric: ActionFabric;
  private actions: {
    beginRequest;
    failRequest;
    successRequest;
  };

  constructor(
    protected facade: FacadeStoreService,
    protected appUser: AppUserStoreService,
    protected router: Router
  ) {
    this.createActions();
  }

  protected createActions() {
    this.actionFabric = this.facade.createActionScopeFabric('login-form');
    this.actions = Object.freeze({
      beginRequest: this.actionFabric('beginRequest'),
      failRequest: this.actionFabric('failRequest'),
      successRequest: this.actionFabric('successRequest')
    });
    this.facade.registerActions(...Object.values(this.actions));
  }

  loginRequest({ login, password }): ILoginFormRequestAction {
    return {
      type: this.actions.beginRequest,
      login,
      password
    };
  }

  loginRequestFail(error: string): ILoginFormRequestFailAction {
    return {
      type: this.actions.failRequest,
      loginError: error
    };
  }

  loginRequestSuccess({ login, name }): ILoginFormRequestSuccessAction {
    return {
      type: this.actions.successRequest,
      login,
      name
    };
  }

  get store() {
    return this.facade.store;
  }

  get state() {
    return this.facade.store.getState().loginForm;
  }

  get epic() {
    return combineEpics(this.loginRequestEpic, this.loginRequestSuccessEpic);
  }

  get reducer(): Reducer<ILoginFormState> {
    return (
      state: ILoginFormState = {
        isLoginRequest: false,
        loginError: null
      },
      action
    ) => {
      switch (action.type) {
        case this.actions.beginRequest:
          return {
            isLoginRequest: true,
            loginError: null
          };
        case this.actions.failRequest:
          return {
            loginError: action.loginError,
            isLoginRequest: false
          };
        case this.actions.successRequest:
          return {
            loginError: null,
            isLoginRequest: false
          };
        default:
          break;
      }
      return state;
    };
  }

  /**epics */
  protected loginRequestEpic: AnyEpic = action$ => {
    // имитируем запрос на бакенд
    return action$.ofType(this.actions.beginRequest).pipe(
      mergeMap(action =>
        of({ login: action.login, name: '1F' }).pipe(
          delay(1000),
          map(result => {
            this.router.navigate(['/']);
            return this.loginRequestSuccess(result);
          }),
          catchError(error => of(this.loginRequestFail(error)))
        )
      )
    );
  };

  protected loginRequestSuccessEpic: AnyEpic = action$ => {
    return action$.ofType(this.actions.successRequest).pipe(
      // переводим стрим
      map(action =>
        this.appUser.appUserLogin({
          login: action.login,
          name: action.login
        })
      )
    );
  };
}
