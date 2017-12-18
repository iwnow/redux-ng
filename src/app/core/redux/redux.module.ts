import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { environment } from '../../../environments/environment';
import { IAppState, initialState, ICoreState } from './models/state';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import * as ducks from './ducks';
import { ReduxEpicService } from '../services/redux-epic.service';

@NgModule({
  imports: [
    NgReduxModule
  ]
})
export class ReduxModule {

  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private epicService: ReduxEpicService
  ) {
    this.configure();
  }

  configure() {

    const middlewares: any[] = [
      createEpicMiddleware(this.epicService.rootEpic)
    ];
    if (!environment.production) {
      middlewares.push(createLogger());
    }

    let enchancers = [];
    if (!environment.production && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
      enchancers = [...enchancers, this.devTools.enhancer()];
    }

    const coreReducer = combineReducers<ICoreState>({
      appUser: ducks.appUser.reducer,
      loginForm: ducks.loginForm.reducer
    });

    const rootReducer = combineReducers<IAppState>({
      core: coreReducer
    });

    this.store.configureStore(
      rootReducer,
      initialState,
      middlewares,
      enchancers
    );
  }
}
