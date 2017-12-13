import { CounterActionService } from './actions/counter';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createLogger } from 'redux-logger';

import { AppComponent } from './app.component';
import { AppCounterListComponent } from './counter-list/counter-list.component';
import { AppCounterComponent } from './counter/counter.component';
import { rootReducer } from './reducers';
import { IAppState, initialState } from './state';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AppCounterComponent,
    AppCounterListComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    AppRoutingModule
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
    if (!environment.production) {
      middlewares.push(createLogger());
    }

    let enchancers = [];
    if (!environment.production && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
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
