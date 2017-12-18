import { IAppUserState } from './app-user';
import { ILoginFormState } from './login-form';

export interface ICoreState {
	authToken?: string;
	appUser?: IAppUserState;
	loginForm: ILoginFormState;
}

export interface IAppState {
	core: ICoreState;
	[key: string]: any;
}

export const initialState: IAppState = {
	core: {
		appUser: null,
		loginForm: {
			isLoginRequest: false,
			loginError: null
		}
	}
};


