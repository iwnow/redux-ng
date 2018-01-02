import { Injectable, Inject } from '@angular/core';
import { ObservableStore, NgRedux } from '@angular-redux/store';
import { INgReduxFormsModuleStore } from './model';
import { ReduxEpicCoreService, AppSettingsCoreService, MODULE_NAME } from '../../../core';
import { NgFormsDuckService } from './ng-forms-duck.service';

@Injectable()
export class NgFormsStoreService {

  readonly store: ObservableStore<INgReduxFormsModuleStore>;

  getBasePath() {
    return [this.appSettings.getReduxLazyPath(), this.moduleName]
  }

  constructor(
    private rootStore: NgRedux<any>,
    private rootEpic: ReduxEpicCoreService,
    private ngFormsDuck: NgFormsDuckService,
    private appSettings: AppSettingsCoreService,
    @Inject(MODULE_NAME) private moduleName: string
  ) {
    this.store = rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), moduleName],
      (state, action) => ({ ...state })
    );
  }

}
