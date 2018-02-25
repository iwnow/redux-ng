import { ReducerMap } from './contracts';
import { Reducer, combineReducers } from 'redux';

export const combiner: <T>(map: ReducerMap<T>) => Reducer<T> = map =>
  combineReducers(map);
