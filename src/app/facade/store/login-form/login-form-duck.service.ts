import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Reducer } from 'redux';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map, catchError, mergeMap } from 'rxjs/operators';

import { AppUserDuckService } from '../app-user/app-user-duck.service';
import { ILoginFormState } from '../model/login-form';
import { ActionFabric, AnyEpic } from '../../../core/store/contracts';

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
export class LoginFormDuckService {
  protected actionFabric: ActionFabric;
  private actions: {
    beginLoginRequest;
    failLoginRequest;
    successLoginRequest;
  };

  constructor(protected appUser: AppUserDuckService, protected router: Router) {
    this.withActionScope(a => `login-form/${a}`);
  }

  withActionScope(scoper: (action: string) => string = a => a) {
    this.actions = Object.freeze({
      beginLoginRequest: scoper('beginLoginRequest'),
      failLoginRequest: scoper('failLoginRequest'),
      successLoginRequest: scoper('successLoginRequest')
    });
    return this;
  }

  loginRequest({ login, password }): ILoginFormRequestAction {
    return {
      type: this.actions.beginLoginRequest,
      login,
      password
    };
  }

  loginRequestFail(error: string): ILoginFormRequestFailAction {
    return {
      type: this.actions.failLoginRequest,
      loginError: error
    };
  }

  loginRequestSuccess({ login, name }): ILoginFormRequestSuccessAction {
    return {
      type: this.actions.successLoginRequest,
      login,
      name
    };
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
        case this.actions.beginLoginRequest:
          return {
            isLoginRequest: true,
            loginError: null
          };
        case this.actions.failLoginRequest:
          return {
            loginError: action.loginError,
            isLoginRequest: false
          };
        case this.actions.successLoginRequest:
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
    return action$.ofType(this.actions.beginLoginRequest).pipe(
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
    return action$.ofType(this.actions.successLoginRequest).pipe(
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
