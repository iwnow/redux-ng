import ICounterState from './counter';
import initialState from './initial-state';

export interface IAppState {
  counters: ICounterState[];
}

export default IAppState;

export {
  ICounterState,
  initialState
};

