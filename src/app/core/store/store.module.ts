import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

import { TOKEN_PROVIDERS_DEFAULT } from './di-tokens';
import {
  StoreLocalStorageService,
  ModuleStoreService,
  StoreEpicService,
  StoreConfigureService
} from './services';
import { StoreService } from './services/store.service';
import { ActionService } from './services/action.service';

@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  declarations: [],
  providers: [
    ...TOKEN_PROVIDERS_DEFAULT,
    StoreLocalStorageService,
    ModuleStoreService,
    StoreEpicService,
    StoreConfigureService,
    StoreService,
    ActionService
  ]
})
export class StoreModule {

  constructor(
    // import StoreModule only once in application
    @Optional() @SkipSelf() parentModule: StoreModule
  ) {
    if (parentModule)
      throw new Error('duplicate import of StoreModule!');
  }

}