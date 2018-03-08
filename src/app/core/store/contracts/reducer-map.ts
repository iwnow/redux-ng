import { Reducer } from 'redux';

export type ReducerMap<T> = { [key in keyof T]: Reducer<any> };
