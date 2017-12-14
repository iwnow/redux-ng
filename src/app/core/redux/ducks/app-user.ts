import { Action } from 'redux';
import { getActionWrapModule } from './utils';
import { IAppUserState } from '../models/app-user';

const prefixAction = 'core/auth-user',
	getActionName = getActionWrapModule(prefixAction);

/**Actions */
const actions = Object.freeze({
	APP_USER_LOGIN: getActionName('APP_USER_LOGIN'),
	APP_USER_LOGOUT: getActionName('APP_USER_LOGOUT')
});

export interface AppUserLoginAction extends Action {
	user: IAppUserState;
}

/**action creators */

const actionCreators = {
	appUserLogin(user: IAppUserState): AppUserLoginAction {
		return {
			type: actions.APP_USER_LOGIN,
			user: user
		};
	},
	appUserLogout(): Action {
		return {
			type: actions.APP_USER_LOGOUT
		};
	}
};

/**reducers */
const reducer = (state: IAppUserState = null, action) => {
	switch (action.type) {
		case actions.APP_USER_LOGIN:
			return action.user;
		case actions.APP_USER_LOGOUT:
			return null;
		default:
			break;
	}
	return state;
};

export {
	actions,
	actionCreators,
	reducer
};
