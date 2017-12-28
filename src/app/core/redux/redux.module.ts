import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { environment } from '../../../environments/environment';
import { IAppState, initialState, ICoreState } from './models/state';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ReduxEpicCoreService } from './services/redux-epic-core.service';
import { ReduxLocalStorageCoreService } from './services/redux-local-storage-core.service';
import { AppUserDuckCoreService } from './services/app-user-duck-core.service';
import { ReduxActionsCoreService } from './services/redux-actions-core.service';
import { LoginFormDuckCoreService } from './services/login-form-duck-core.service';

@NgModule({
  imports: [
    NgReduxModule
  ],
  providers: [
    ReduxEpicCoreService,
    ReduxLocalStorageCoreService,
    AppUserDuckCoreService,
    ReduxActionsCoreService,
    LoginFormDuckCoreService
  ]
})
export class ReduxCoreModule {

  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private epicService: ReduxEpicCoreService,
    private localStorage: ReduxLocalStorageCoreService,
    private appUserDuckService: AppUserDuckCoreService,
    private loginFormDuckService: LoginFormDuckCoreService
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
      appUser: this.appUserDuckService.reducer,
      loginForm: this.loginFormDuckService.reducer
    });

    const rootReducer = combineReducers<IAppState>({
      core: coreReducer
    });

    const initialStateWithLocalStorage = {
      ...initialState,
      ...this.localStorage.loadState()
    };

    this.store.configureStore(
      rootReducer,
      initialStateWithLocalStorage,
      middlewares,
      enchancers
    );

    this.store.subscribe(() => this.localStorage.saveStateDebounce({
      core: this.store.getState().core
    }));
  }
}
