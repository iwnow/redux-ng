import ICounterState from './counter';
import { default as initialState, initialState } from './initial-state';

export interface IAppState {
  counters: ICounterState[];
}

export default IAppState;

export {
  ICounterState,
  initialState
};

