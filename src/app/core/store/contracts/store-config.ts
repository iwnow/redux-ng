import { AnyAction, Middleware } from 'redux';
import { Epic } from 'redux-observable';
import { ReducerMap } from './reducer-map';

export interface RootStoreConfig {
  reducers?: ReducerMap<any>;
  epic?: Epic<AnyAction, any>;
  initialState?: any;
  enchancers?: any[];
  middlewares?: Middleware[];
  devTools?: boolean;
  routerStorePath?: string;
}
