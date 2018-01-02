import { Injectable, Inject } from '@angular/core';
import { ICounterModuleStore } from './model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { IAppState, AppSettingsCoreService } from '../../../core';
import { CounterDuckService } from './counter-duck.service';
import { MODULE_NAME } from '../../../core';

@Injectable()
export class CounterStoreService {

  readonly store: ObservableStore<ICounterModuleStore>;

  constructor(
    private rootStore: NgRedux<IAppState>,
    private counterDuck: CounterDuckService,
    private appSettings: AppSettingsCoreService,
    @Inject(MODULE_NAME) moduleName
  ) {
    this.store = rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), moduleName],
      this.counterDuck.reducer
    );
  }

}
