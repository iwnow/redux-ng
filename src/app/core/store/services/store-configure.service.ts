import { Injectable } from '@angular/core';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { Middleware } from 'redux';

import * as logger from '../../diagnostics/logger';
import { RootStoreConfig } from '../contracts';
import { StoreEpicService } from './store-epic.service';
import env from '../../env';

@Injectable()
export class StoreConfigureService {
  protected logger: logger.ILog;
  protected configured = false;

  constructor(
    protected loggerSrv: logger.LoggerService,
    protected epicSrv: StoreEpicService,
    protected devTools: DevToolsExtension
  ) {
    this.logger = loggerSrv.createLoggerForThis(this);
  }

  /**configure application store,
   * must call only once in application root */
  configure<StateType>(config: RootStoreConfig<StateType>) {
    try {
      if (!config)
        throw new Error('Config for root store not passed!');
      if (this.configured)
        throw new Error(`duplicate call 'StoreConfigureService.configure()'`);

      // EPIC
      const rootEpic = this.epicSrv.createRootEpic(config.epic);
      const middlewares: any[] = [
        createEpicMiddleware(rootEpic)
      ];
      if (!env.production) {
        middlewares.push(createLogger());
      }
      // ENCHANCERS
      let enchancers = [];
      if (!env.production
        && config.devTools
        && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
        enchancers = [...enchancers, this.devTools.enhancer()];
      }

      // const coreReducer = combineReducers<ICoreState>({
      //   appUser: this.appUserDuckService.reducer,
      //   loginForm: this.loginFormDuckService.reducer
      // });

      // const rootReducer = combineReducers<IAppState>({
      //   router: routerReducer,
      //   core: coreReducer,
      //   [this.reduxLazyBasePath]: (state = {}) => ({ ...state })
      // });

      // const initialStateWithLocalStorage = {
      //   ...initialState,
      //   ...this.localStorage.getState()
      // };

      // this.store.configureStore(
      //   rootReducer,
      //   initialStateWithLocalStorage,
      //   middlewares,
      //   enchancers
      // );

      // this.reduxRouter.initialize(state => state.router);

      // !this.appSettings.isProductionMode()
      //   && this.store.select(s => s.router).subscribe(route => this.router.navigate([route]));

      // this.store.subscribe(() => this.localStorage.saveState({
      //   core: this.store.getState().core
      // }));

    } catch (e) {
      this.logger.log(logger.LogType.error, e);
    } finally {
      this.configured = true;
      this.logger.log(logger.LogType.info, 'store is configured');
    }
  }

}
