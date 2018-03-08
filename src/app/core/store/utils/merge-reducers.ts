import { ReducerMap } from '../contracts';
import { Reducer, combineReducers } from 'redux';

/**
 * Like combineReducers but with return typeable Reducer by object that passed in argument
 * @example
 * // type of rootReducer is {
 * // field1: typeof reducer1,
 * // field2: typeof reducer2,
 * // ...
 * // }
 * const rootReducer = mergeReducers({
 *  field1: reducer1,
 *  field2: reducer2,
 *  field3: mergeReducer({
 *    ...
 *  })
 * })
 */
export const mergeReducers: <T>(map: ReducerMap<T>) => Reducer<T> = map =>
  combineReducers(map);
