import { Action, ActionCreator } from 'redux';

export interface ICounterAction extends Action {
  id?: number;
}

export enum CounterActions {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  INCREMENT_LIST = 'INCREMENT_LIST',
  DECREMENT_LIST = 'DECREMENT_LIST'
}

export class CounterActionService {

  increment(id: number): ICounterAction {
    return {
      type: CounterActions.INCREMENT,
      id
    };
  }

  decrement(id: number): ICounterAction {
    return {
      type: CounterActions.DECREMENT,
      id
    };
  }

  incrementList(): ICounterAction {
    return {
      type: CounterActions.INCREMENT_LIST
    };
  }

  decrementList(): ICounterAction {
    return {
      type: CounterActions.DECREMENT_LIST
    };
  }
}
