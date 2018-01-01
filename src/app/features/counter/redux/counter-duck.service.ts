import { Injectable, Inject } from '@angular/core';
import { Action, Reducer } from 'redux';

import { DuckCoreBase, ReduxActionsCoreService } from '../../../core';
import { COUNTER_MODULE_NAME } from '../counter.di-tokens';
import { ICounter, ICounterModuleStore } from './model';

export interface ICounterAction extends Action {
  id?: number;
}

@Injectable()
export class CounterDuckService extends DuckCoreBase {

  private actions = Object.freeze({
    increment: this.actionFabric('COUNTER_INCREMENT'),
    decrement: this.actionFabric('COUNTER_DECREMENT'),
    incrementList: this.actionFabric('COUNTER_LIST_INCREMENT'),
    decrementList: this.actionFabric('COUNTER_LIST_DECREMENT')
  });

  constructor(
    actionService: ReduxActionsCoreService,
    @Inject(COUNTER_MODULE_NAME) moduleName
  ) {
    super(actionService, `${moduleName}/counter`);
  }

  getActions(): string[] {
    return Object.values(this.actions);
  }
  getEpics(): any[] {
    throw new Error("Method not implemented.");
  }

  createActionIncrement(id: number): ICounterAction {
    return {
      type: this.actions.increment,
      id
    }
  }

  createActionDecrement(id: number): ICounterAction {
    return {
      type: this.actions.decrement,
      id
    }
  }

  createActionIncrementList(): Action {
    return {
      type: this.actions.incrementList
    }
  }

  createActionDecrementList(): Action {
    return {
      type: this.actions.decrementList
    }
  }

  readonly reducer: Reducer<ICounterModuleStore>
    = (state = { counters: [] }, action) => {
      const { increment, decrement,
        incrementList, decrementList } = this.actions;
      switch (action.type) {
        case increment:
          return {
            counters: state.counters.map(c => {
              if (c.id === action.id) {
                c = {
                  ...c,
                  count: c.count + 1
                }
              }
              return c;
            })
          }
        case decrement:
          return {
            counters: state.counters.map(c => {
              if (c.id === action.id) {
                c = {
                  ...c,
                  count: c.count - 1
                }
              }
              return c;
            })
          }
        case incrementList:
          return {
            counters: [
              ...state.counters,
              {
                id: state.counters.length,
                count: 0
              }
            ]
          }
        case decrementList:
          return {
            counters: [
              ...state.counters.slice(0, state.counters.length - 1)
            ]
          }
        default:
          break;
      }
      return state;
    }

}
