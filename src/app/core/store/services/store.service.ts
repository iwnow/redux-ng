import { Injectable } from '@angular/core';
import { NgRedux, Selector, Comparator } from '@angular-redux/store';
import { Action } from 'redux';

/** Root store service*/
@Injectable()
export class StoreService {
  constructor(protected store: NgRedux<any>) {}

  select<RootStateType, SelectStateType>(
    selector: Selector<RootStateType, SelectStateType>
  ) {
    return this.store.select(selector);
  }

  getState<T>(): T {
    return this.store.getState() as T;
  }

  dispatch<A extends Action>(action: A) {
    return this.store.dispatch(action);
  }

  subscribe(listener: () => void) {
    return this.store.subscribe(listener);
  }
}
