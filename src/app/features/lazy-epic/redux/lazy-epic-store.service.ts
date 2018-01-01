import { Injectable, Inject } from '@angular/core';
import { ObservableStore, NgRedux } from '@angular-redux/store';
import { ILazyEpicModuleStore } from './model';
import { LazyEpicDuckService } from './lazy-epic-duck.service';
import { AppSettingsCoreService, ReduxEpicCoreService } from '../../../core';
import { LAZY_EPIC_MODULE_NAME } from '../lazy-epic.di-tokens';

@Injectable()
export class LazyEpicStoreService {

  readonly store: ObservableStore<ILazyEpicModuleStore>;

  constructor(
    private rootStore: NgRedux<any>,
    private rootEpic: ReduxEpicCoreService,
    private lazyEpicDuck: LazyEpicDuckService,
    private appSettings: AppSettingsCoreService,
    @Inject(LAZY_EPIC_MODULE_NAME) moduleName
  ) {
    this.store = rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), moduleName],
      lazyEpicDuck.reducer
    );
    lazyEpicDuck.getEpics().forEach(e => rootEpic.registerEpic(e));
  }

}
