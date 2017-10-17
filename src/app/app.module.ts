import { CounterActionService } from './actions/counter';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppCounterListComponent } from './counter-list/counter-list.component';
import { AppCounterComponent } from './counter/counter.component';
import { rootReducer } from './reducers';
import { IAppState, initialState } from './state';
import { environment } from '../environments/environment';

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
  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {
    const middlewares = [];

    let enchancers = [];
    if (!environment.production) {
      enchancers = [...enchancers, devTools.enhancer()];
    }

    store.configureStore(
      rootReducer,
      initialState,
      middlewares,
      enchancers
    );
  }
}
