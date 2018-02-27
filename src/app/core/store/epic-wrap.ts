import { ActionsObservable, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { AnyAction, Action } from 'redux';
import { AnyEpic } from './contracts';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export const epicWrap: <ActionType extends AnyAction>(
  epic: Epic<ActionType, any, any>
) => AnyEpic = epic => {
  return (actions$: ActionsObservable<any>, store, deps) => {
    return actions$.pipe(
      mergeMap(actionIn => {
        return epic(actions$, store, deps).pipe(
          map(actionOut => {
            const fullAct = {
              ...actionIn, // for fractal store
              ...(<{}>actionOut)
            };
            console.log('spread', fullAct);
            return fullAct;
          })
        );
      })
    );
  };
};
