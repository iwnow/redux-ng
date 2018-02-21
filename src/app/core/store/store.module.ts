import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TOKEN_PROVIDERS_DEFAULT } from './di-tokens';
import * as storeServices from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ...TOKEN_PROVIDERS_DEFAULT,
    storeServices.StoreLocalStorageService,
    storeServices.ModuleStoreService,
    storeServices.StoreEpicService
  ]
})
export class StoreModule { }
