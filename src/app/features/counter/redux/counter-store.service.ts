import { Injectable, Inject } from '@angular/core';
import { IStoreCounters } from './model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { IAppState, AppSettingsCoreService } from '../../../core';
import { CounterDuckService } from './counter-duck.service';
import { COUNTER_MODULE_NAME } from '../counter.di-tokens';

@Injectable()
export class CounterStoreService {

  readonly store: ObservableStore<IStoreCounters>;

  constructor(
    private rootStore: NgRedux<IAppState>,
    private counterDuck: CounterDuckService,
    private appSettings: AppSettingsCoreService,
    @Inject(COUNTER_MODULE_NAME) moduleName
  ) {
    this.store = rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), moduleName],
      this.counterDuck.reducer
    );
  }

}
