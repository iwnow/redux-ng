import { Injectable, Inject } from '@angular/core';
import { ICounterModuleStore } from './model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { IAppState, AppSettingsCoreService } from '../../../core';
import { CounterDuckService } from './counter-duck.service';
import { MODULE_NAME } from '../../../core';

import undoable from 'redux-undo';

@Injectable()
export class CounterStoreService {

  readonly store: ObservableStore<ICounterModuleStore>;

  constructor(
    private rootStore: NgRedux<IAppState>,
    private counterDuck: CounterDuckService,
    private appSettings: AppSettingsCoreService,
    @Inject(MODULE_NAME) moduleName
  ) {
    this.store = <any>rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), moduleName],
      undoable(this.counterDuck.reducer, { limit: 10 })
    );
  }

}
