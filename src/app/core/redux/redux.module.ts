import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { environment } from '../../../environments/environment';
import { IAppState, initialState } from './models/state';
import { combineReducers } from 'redux';
import * as ducks from './ducks';

@NgModule({
  imports: [
    NgReduxModule
  ]
})
export class ReduxModule {
  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {
    const middlewares = [];
    if (!environment.production) {
      middlewares.push(createLogger());
    }

    let enchancers = [];
    if (!environment.production && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
      enchancers = [...enchancers, devTools.enhancer()];
    }

    const rootReducer = combineReducers<IAppState>({
      appUser: ducks.appUser.reducer,
      loginForm: ducks.loginForm.reducer
    });

    store.configureStore(
      rootReducer,
      initialState,
      middlewares,
      enchancers
    );
  }
}
