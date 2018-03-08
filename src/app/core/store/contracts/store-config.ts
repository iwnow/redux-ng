import { AnyAction, ReducersMapObject, Middleware } from 'redux';
import { Epic } from 'redux-observable';

export interface RootStoreConfig<StateType> {
	reducers: ReducersMapObject;
	epic: Epic<AnyAction, any>;
	initialState: StateType;
	enchancers?: any[];
	middlewares?: Middleware[];
	devTools?: boolean;
	routerStorePath?: string;
}
