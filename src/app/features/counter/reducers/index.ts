import { combineReducers, Action } from 'redux';
import { IAppState } from '../state';
import counters from './counters';

export const rootReducer: (state: IAppState, action: Action) => IAppState
  = combineReducers<IAppState>({
    counters
  });

export default rootReducer;
