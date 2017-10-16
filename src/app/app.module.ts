import { CounterActionService } from './actions/counter';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppCounterListComponent } from './counter-list/counter-list.component';
import { AppCounterComponent } from './counter/counter.component';
import { rootReducer } from './reducers';
import { IAppState, initialState } from './state';

@NgModule({
  declarations: [
    AppComponent,
    AppCounterComponent,
    AppCounterListComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [CounterActionService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: NgRedux<IAppState>) {
    store.configureStore(rootReducer, initialState);
  }
}
