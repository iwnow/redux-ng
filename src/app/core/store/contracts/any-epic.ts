import { Epic, ActionsObservable } from 'redux-observable';
import { AnyAction, Action, MiddlewareAPI } from 'redux';
import { Observable } from 'rxjs/Observable';
import { epad } from '@vh/core/store/utils';
import { UnaryFunction } from 'rxjs/interfaces';

export interface VhActionsObservable<T extends Action> extends ActionsObservable<T> {
	epipe(...operators: UnaryFunction<Observable<T>, Observable<T>>[]): Observable<T>;
	ofType<R extends T = T>(...key: R['type'][]): VhActionsObservable<R>;
}

export type VhEpic<T extends Action, S, D = any, O extends T = T> =
	(action$: VhActionsObservable<T>, store: MiddlewareAPI<S>, dependencies: D) => Observable<O>;

export type AnyEpic = VhEpic<AnyAction, any>;

// add to prototype ActionsObservable new method epipe
export const extendActionsObservable = () => {
	(<any>ActionsObservable.prototype).epipe = function(...operators) {
		return this.pipe(epad(...operators));
	}
}
