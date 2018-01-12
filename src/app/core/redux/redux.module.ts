import { NgModule, Optional, SkipSelf, Injector, Inject } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { routerReducer, NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { createLogger } from 'redux-logger';
import { IAppState, initialState, ICoreState } from './models/state';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ReduxEpicCoreService } from './services/redux-epic-core.service';
import { ReduxLocalStorageCoreService } from './services/redux-local-storage-core.service';
import { AppUserDuckCoreService } from './services/app-user-duck-core.service';
import { ReduxActionsCoreService } from './services/redux-actions-core.service';
import { LoginFormDuckCoreService } from './services/login-form-duck-core.service';
import { LoggerCoreService, ILog, LogType } from '../services/logger-core.service';
import { Router } from '@angular/router';
import { AppSettingsCoreService } from '../services/app-settings-core.service';
import { REDUX_LAZY_BASE_PATH } from '../core.di-tokens';

@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [
    ReduxEpicCoreService,
    ReduxLocalStorageCoreService,
    AppUserDuckCoreService,
    ReduxActionsCoreService,
    LoginFormDuckCoreService
  ],
  declarations: [

  ],
  exports: [

  ]
})
export class ReduxCoreModule {
  private logger: ILog;

  constructor(
    // import ReduxCoreModule only one time in app/core module
    @Optional() @SkipSelf() parentModule: ReduxCoreModule,
    private store: NgRedux<IAppState>,
    private reduxRouter: NgReduxRouter,
    @Inject(REDUX_LAZY_BASE_PATH)
    private reduxLazyBasePath,
    private router: Router,
    private appSettings: AppSettingsCoreService,
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
    if (!this.appSettings.isProductionMode()) {
      middlewares.push(createLogger());
    }

    let enchancers = [];
    if (!this.appSettings.isProductionMode() && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
      enchancers = [...enchancers, this.devTools.enhancer()];
    }

    const coreReducer = combineReducers<ICoreState>({
      appUser: this.appUserDuckService.reducer,
      loginForm: this.loginFormDuckService.reducer
    });

    const rootReducer = combineReducers<IAppState>({
      router: routerReducer,
      core: coreReducer,
      [this.reduxLazyBasePath]: (state = {}) => ({ ...state })
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

    this.reduxRouter.initialize(state => state.router);

    !this.appSettings.isProductionMode()
      && this.store.select(s => s.router).subscribe(route => this.router.navigate([route]));

    this.store.subscribe(() => this.localStorage.saveState({
      core: this.store.getState().core
    }));
  }
}
