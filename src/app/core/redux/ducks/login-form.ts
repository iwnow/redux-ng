import { Action, Reducer } from 'redux';
import { getActionWrapModule } from './utils';
import { ILoginFormState } from '../models/login-form';

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
}

export interface LoginFormRequestFailAction extends Action {
	loginError: string;
}

/**action creators */

const actionCreators = {
	loginFormRequest(isLoginRequest: boolean): LoginFormRequestAction {
		return {
			type: actions.LOGIN_FORM_REQUEST,
			isLoginRequest: isLoginRequest
		};
	},
	loginFormRequestFail(error: string): LoginFormRequestFailAction {
		return {
			type: actions.LOGIN_FORM_REQUEST_FAIL,
			loginError: error
		};
	},
	loginFormRequestSuccess(): Action {
		return {
			type: actions.LOGIN_FORM_REQUEST_SUCCESS
		};
	}
};

/**reducers */
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

export {
	actions,
	actionCreators,
	reducer
};
