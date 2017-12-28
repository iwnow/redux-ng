import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Reducer } from 'redux';
import { ReduxActionsCoreService, IActionFabric } from './redux-actions-core.service';
import { ILoginFormState } from '../models/login-form';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import tokens from '../../core.di-tokens';
import { DuckCoreBase } from './duck-core-base';
import { AppUserDuckCoreService } from './app-user-duck-core.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface ILoginFormRequestAction extends Action {
	isLoginRequest: boolean;
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
export class LoginFormDuckCoreService extends DuckCoreBase {
  private actions = Object.freeze({
    LOGIN_FORM_REQUEST: this.actionFabric('LOGIN_REQUEST'),
    LOGIN_FORM_REQUEST_FAIL: this.actionFabric('LOGIN_REQUEST_FAIL'),
    LOGIN_FORM_REQUEST_SUCCESS: this.actionFabric('LOGIN_REQUEST_SUCCESS')
  });

  constructor(
    actionService: ReduxActionsCoreService,
    @Inject(tokens.CORE_MODULE_NAME) coreModuleName: string,
    private appUserDuckService: AppUserDuckCoreService,
    private router: Router
  ) {
    super(actionService, `${coreModuleName}/login-form`);
  }

  createActionLoginFormRequest({isLoginRequest, login, password}): ILoginFormRequestAction {
		return {
			type: this.actions.LOGIN_FORM_REQUEST,
			isLoginRequest,
			login,
			password
		};
  }

	createActionLoginFormRequestFail(error: string): ILoginFormRequestFailAction {
		return {
			type: this.actions.LOGIN_FORM_REQUEST_FAIL,
			loginError: error
		};
  }

	createActionLoginFormRequestSuccess({login, name}): ILoginFormRequestSuccessAction {
		return {
			type: this.actions.LOGIN_FORM_REQUEST_SUCCESS,
			login,
			name
		};
  }

  getActions() {
    return [
      this.actions.LOGIN_FORM_REQUEST,
      this.actions.LOGIN_FORM_REQUEST_FAIL,
      this.actions.LOGIN_FORM_REQUEST_SUCCESS
    ];
  }

  getEpics() {
    return [
      this.loginRequestEpic,
      this.loginRequestSuccessEpic
    ];
  }

  readonly reducer: Reducer<ILoginFormState>
    = (state: ILoginFormState = {
      isLoginRequest: false,
      loginError: null
    }, action) => {
      switch (action.type) {
        case this.actions.LOGIN_FORM_REQUEST:
          return {
            ...state,
            isLoginRequest: action.isLoginRequest,
            loginError: null
          };
        case this.actions.LOGIN_FORM_REQUEST_FAIL:
          return {
            ...state,
            loginError: action.loginError,
            isLoginRequest: false
          };
        case this.actions.LOGIN_FORM_REQUEST_SUCCESS:
          return {
            ...state,
            loginError: null,
            isLoginRequest: false
          };
        default:
          break;
      }
      return state || {
        isLoginRequest: false,
        loginError: null
      };
    }

    /**epics */
    readonly loginRequestEpic = (action$: ActionsObservable<any>) => {
      return action$.ofType(this.actions.LOGIN_FORM_REQUEST)
        .mergeMap(action => {
          // имитируем запрос на бакенд
          const fakeUserData = { login: action.login, name: '1F' };
          return Observable.of(fakeUserData)
            .delay(100)
            .map(result => {
              this.router.navigate(['/']);
              return this.createActionLoginFormRequestSuccess(result);
            })
            .catch(error => Observable.of(this.createActionLoginFormRequestFail(error)));
        });
    }

    readonly loginRequestSuccessEpic = (action$: ActionsObservable<any>) => {
      return action$.ofType(this.actions.LOGIN_FORM_REQUEST_SUCCESS)
        // переводим стрим
        .map(action => this.appUserDuckService.createActionAppUserLogin({
          login: action.login,
          name: action.login
        }));
    }

}
