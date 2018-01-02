import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectReduxStoreDirective } from './directives/connect-redux-store.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConnectReduxStoreDirective],
  exports: [ConnectReduxStoreDirective]
})
export class ReduxSharedModule { }
