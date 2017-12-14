import { IAppUserState } from './app-user';
import { ILoginFormState } from './login-form';

export interface IAppState {
	authToken?: string;
	appUser?: IAppUserState;
	loginForm: ILoginFormState;
	[key: string]: any;
}

export const initialState: IAppState = {
	appUser: null,
	loginForm: {
		isLoginRequest: false,
		loginError: null
	}
};


