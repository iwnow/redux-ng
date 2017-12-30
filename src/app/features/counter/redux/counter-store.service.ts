import { Injectable, Inject } from '@angular/core';
import { IStoreCounters } from './model';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { IAppState, REDUX_DYNAMIC_STATE_PATH } from '../../../core';
import { CounterDuckService } from './counter-duck.service';

@Injectable()
export class CounterStoreService {

  readonly store: ObservableStore<IStoreCounters>;
  readonly pathName = 'counterModule';

  constructor(
    private rootStore: NgRedux<IAppState>,
    private counterDuck: CounterDuckService,
    @Inject(REDUX_DYNAMIC_STATE_PATH) dynamicPath: string
  ) {
    this.store = rootStore.configureSubStore(
      [dynamicPath, this.pathName],
      this.counterDuck.reducer
    );
  }

}
