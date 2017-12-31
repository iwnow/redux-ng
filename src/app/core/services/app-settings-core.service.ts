import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { REDUX_LAZY_BASE_PATH } from '../core.di-tokens';

@Injectable()
export class AppSettingsCoreService {

  constructor(
    @Inject(REDUX_LAZY_BASE_PATH)
    private baseLazyPath: string
  ) { }

  isProductionMode() {
    return environment.production;
  }

  getReduxLazyPath() {
    return this.baseLazyPath;
  }

}
