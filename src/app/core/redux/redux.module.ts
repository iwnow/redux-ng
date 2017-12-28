import { NgModule, Optional, SkipSelf } from '@angular/core';
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
import { LoggerCoreService, ILog, LogType } from '../services/logger-core.service';

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
  private logger: ILog;

  constructor(
    // import ReduxCoreModule only one time in app/core module
    @Optional() @SkipSelf() parentModule: ReduxCoreModule,
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private epicService: ReduxEpicCoreService,
    private loggerService: LoggerCoreService,
    private localStorage: ReduxLocalStorageCoreService,
    private appUserDuckService: AppUserDuckCoreService,
    private loginFormDuckService: LoginFormDuckCoreService
  ) {
    this.logger = loggerService.createLogger(ReduxCoreModule.name);
    if (parentModule) {
      const err = new Error('duplicate import of ReduxCoreModule!');
      this.logger.log(LogType.error, err);
      throw err;
    }
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

    this.store.subscribe(() => this.localStorage.saveState({
      core: this.store.getState().core
    }));
  }
}
