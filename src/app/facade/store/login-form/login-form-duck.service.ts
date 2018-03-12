import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map, catchError, mergeMap, tap } from 'rxjs/operators';

import {
  ActionFabric,
  AnyEpic,
  AnyAction,
  Reducer
} from '@vh/core/store/contracts';
import { epad, mergeEpic } from '@vh/core/store/utils';

import { AppUserDuckService } from '../app-user/app-user-duck.service';
import { ILoginFormState } from '../model/login-form';

export interface ILoginFormRequestAction extends AnyAction {
  login: string;
  password: string;
}

export interface ILoginFormRequestFailAction extends AnyAction {
  loginError: string;
}

export interface ILoginFormRequestSuccessAction extends AnyAction {
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
    return mergeEpic(this.loginRequestEpic, this.loginRequestSuccessEpic);
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
    return action$
      .ofType(this.actions.beginLoginRequest)
      .epipe(
        mergeMap(action =>
          of({ login: action.login, name: '1F' }).pipe(
            delay(1000),
            map(result => this.loginRequestSuccess(result)),
            catchError(error => of(this.loginRequestFail(error.message)))
          )
        )
      );
      // .pipe(
      //   epad(
      //     mergeMap(action =>
      //       of({ login: action.login, name: '1F' }).pipe(
      //         delay(1000),
      //         map(result => this.loginRequestSuccess(result)),
      //         catchError(error => of(this.loginRequestFail(error.message)))
      //       )
      //     )
      //   )
      // );
  };

  protected loginRequestSuccessEpic: AnyEpic = action$ => {
    return action$.ofType(this.actions.successLoginRequest)
      // переводим стрим
      .epipe(
        map(action => {
          return this.appUser.appUserLogin({
            login: action.login,
            name: action.login
          });
        })
      );
  };
}
