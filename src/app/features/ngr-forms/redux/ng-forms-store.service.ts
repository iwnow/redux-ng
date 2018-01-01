import { Injectable } from '@angular/core';
import { ObservableStore, NgRedux } from '@angular-redux/store';
import { INgReduxFormsModuleStore } from './model';
import { ReduxEpicCoreService, AppSettingsCoreService } from '../../../core';
import { NgFormsDuckService } from './ng-forms-duck.service';

@Injectable()
export class NgFormsStoreService {

  readonly store: ObservableStore<INgReduxFormsModuleStore>;

  getBasePath() {
    return [this.appSettings.getReduxLazyPath(), 'ngReduxFormsModule']
  }

  constructor(
    private rootStore: NgRedux<any>,
    private rootEpic: ReduxEpicCoreService,
    private ngFormsDuck: NgFormsDuckService,
    private appSettings: AppSettingsCoreService,
  ) {
    this.store = rootStore.configureSubStore(
      [appSettings.getReduxLazyPath(), 'ngReduxFormsModule'],
      (state, action) => {
        console.log(action)
        switch (action.type) {
          case '@@angular-redux/form/FORM_CHANGED':
            return {
              testForm: { ...action.payload.value }
            }
          default:
            break;
        }
        return state && { ...state } || {
          testForm: {
            autocomplete: ''
          }
        }
      }
    );
    this.store.dispatch({ type: 'INIT_MODULE' });
  }

}
