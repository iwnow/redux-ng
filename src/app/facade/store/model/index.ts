import { IAppUserState } from './app-user';
import { ILoginFormState } from './login-form';

interface IFacadeState {
  appUser?: IAppUserState;
  loginForm?: ILoginFormState;
  styleTheme?: string;
}

const initialFacadeState: IFacadeState = {
  loginForm: {
    isLoginRequest: false,
    loginError: null
  }
};

export { IAppUserState, ILoginFormState, IFacadeState, initialFacadeState };
