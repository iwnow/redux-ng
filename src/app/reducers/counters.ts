import { CounterActions, ICounterAction } from '../actions/counter';
import { ICounterState } from '../state/counter';

export const counters: (state: ICounterState[], action: ICounterAction) => ICounterState[]
= (state = [], action) => {
  switch (action.type) {
    case CounterActions.DECREMENT:
      return state.map(counter => {
        if (counter.id === action.id) {
          return {
            id: counter.id,
            count: counter.count - 1
          };
        }
        return counter;
      });
    case CounterActions.INCREMENT:
      return state.map(counter => {
        if (counter.id === action.id) {
          return {
            id: counter.id,
            count: counter.count + 1
          };
        }
        return counter;
      });
    case CounterActions.INCREMENT_LIST:
      return [
        ...state,
        { id: state.length, count: 0 }
      ];
    case CounterActions.DECREMENT_LIST:
      return state.slice(0, state.length - 1);
    default:
      break;
  }

  return state;
};

export default counters;
