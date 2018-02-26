import { ActionsObservable, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { AnyAction, Action } from 'redux';
import { AnyEpic } from './contracts';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export const epicWrap: <ActionType extends AnyAction>(
  epic: Epic<ActionType, any, any>
) => AnyEpic = epic => {
  const subj = new Subject<Action>();
  return (actions$: ActionsObservable<any>, store, deps) => {
    actions$.subscribe(act => subj.next(act));
    return epic(actions$, store, deps).pipe(
      switchMap(act => {
        console.log('switch', act);
        return subj.pipe(
          map(a => {
            console.log('spread', a);
            return {
              ...a,
              ...(<{}>act)
            };
          })
        );
      })
    );
  };
  // epic(actions$, store, deps);
  // actions$.pipe(
  //   switchMap(action => {
  //     return epic(actions$, store, deps).pipe(
  //       map(act => {
  //         const mapped = {
  //           ...action,
  //           ...(<{}>act)
  //         };
  //         console.log(action, 'to', mapped);
  //         return mapped;
  //       })
  //     );
  //   })
  // );
};
