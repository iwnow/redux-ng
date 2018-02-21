import { Injectable, Inject } from '@angular/core';
import env from '../env';
import { REDUX_LAZY_BASE_PATH } from '../core.di-tokens';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux';

@Injectable()
export class AppSettingsCoreService {

  readonly themes = Object.freeze({
    default: 'default-theme',
    dark: 'dark-theme',
    theme3: 'theme3'
  });

  constructor(
    @Inject(REDUX_LAZY_BASE_PATH)
    private baseLazyPath: string,
    private store: NgRedux<IAppState>
  ) { }

  isProductionMode() {
    return env.production;
  }

  getReduxLazyPath() {
    return this.baseLazyPath;
  }

  selectAppTheme() {
    return this.store.select(store => store.core
      && store.core.appUser
      && store.core.appUser.appTheme);
  }

}
