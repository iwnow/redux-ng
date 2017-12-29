import { IAppUserState } from './app-user';
import { ILoginFormState } from './login-form';

export interface ICoreState {
	authToken?: string;
	appUser?: IAppUserState;
	loginForm: ILoginFormState;
}

export interface IAppState {
	core: ICoreState;
	router?: string;
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


