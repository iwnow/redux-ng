import { Action, Reducer } from 'redux';
import { getActionWrapModule } from './utils';
import { ILoginFormState } from '../models/login-form';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as appUserDuck from './app-user';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const prefixAction = 'core/login-form',
	getActionName = getActionWrapModule(prefixAction);

/**Actions */
const actions = Object.freeze({
	LOGIN_FORM_REQUEST: getActionName('LOGIN_REQUEST'),
	LOGIN_FORM_REQUEST_FAIL: getActionName('LOGIN_REQUEST_FAIL'),
	LOGIN_FORM_REQUEST_SUCCESS: getActionName('LOGIN_REQUEST_SUCCESS')
});

export interface LoginFormRequestAction extends Action {
	isLoginRequest: boolean;
	login: string;
	password: string;
}

export interface LoginFormRequestFailAction extends Action {
	loginError: string;
}

export interface LoginFormRequestSuccessAction extends Action {
	login: string;
	name: string;
}

/**action creators */

const actionCreators = {
	loginFormRequest({isLoginRequest, login, password}): LoginFormRequestAction {
		return {
			type: actions.LOGIN_FORM_REQUEST,
			isLoginRequest,
			login,
			password
		};
	},
	loginFormRequestFail(error: string): LoginFormRequestFailAction {
		return {
			type: actions.LOGIN_FORM_REQUEST_FAIL,
			loginError: error
		};
	},
	loginFormRequestSuccess({login, name}): LoginFormRequestSuccessAction {
		return {
			type: actions.LOGIN_FORM_REQUEST_SUCCESS,
			login,
			name
		};
	}
};

/**reducer */
const reducer: Reducer<ILoginFormState> = (state: ILoginFormState, action) => {
	switch (action.type) {
		case actions.LOGIN_FORM_REQUEST:
			return {
				...state,
				isLoginRequest: action.isLoginRequest,
				loginError: null
			};
		case actions.LOGIN_FORM_REQUEST_FAIL:
			return {
				...state,
				loginError: action.loginError,
				isLoginRequest: false
			};
		case actions.LOGIN_FORM_REQUEST_SUCCESS:
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
};

/**epics */
const loginRequestEpic = (action$: ActionsObservable<any>) => {
	return action$.ofType(actions.LOGIN_FORM_REQUEST)
		.mergeMap(action => {
			// имитируем запрос на бакенд
			return Observable.of({ login: action.login, name: '1F' })
				.delay(100)
				.map(result => actionCreators.loginFormRequestSuccess(result))
				.catch(error => Observable.of(actionCreators.loginFormRequestFail(error)));
		});
};

const loginRequestSuccessEpic = (action$: ActionsObservable<any>) => {
	return action$.ofType(actions.LOGIN_FORM_REQUEST_SUCCESS)
		.map(action => appUserDuck.actionCreators.appUserLogin({
			login: action.login,
			name: action.login
		}));
};


const epics = [
	loginRequestEpic,
	loginRequestSuccessEpic
];


export {
	actions,
	actionCreators,
	reducer,
	epics
};
