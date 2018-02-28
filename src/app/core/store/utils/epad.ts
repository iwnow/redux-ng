import { Observable } from 'rxjs/Observable';
import { AnyAction } from 'redux';
import { map, tap } from 'rxjs/operators';
import { UnaryFunction } from 'rxjs/interfaces';
import { Observer } from 'rxjs/Observer';

const toObserver = <T>(observer: Observer<T>) => ({
  next(x) {
    observer.next(x);
  },
  error(err) {
    observer.error(err);
  },
  complete() {
    observer.complete();
  }
});

const spreadPipe = (...operators) => <T>(source: Observable<T>) =>
  new Observable<T>(observer =>
    (<any>source).pipe(...operators).subscribe(toObserver(observer))
  );

/**epad is Epic Pipe ADapter
 * for usage in pipe epic stream, encapsulates working with fractal stores action data by spreading result actions
 * @example
 * const loginRequestSuccessEpic: AnyEpic = action$ => {
 *  return action$.ofType(this.actions.successLoginRequest).pipe(
 *    // переводим стрим
 *    epad(
 *      map(action => {
 *        return this.appUser.appUserLogin({
 *          login: action.login,
 *          name: action.login
 *        });
 *      })
 *    )
 *  );
 * };
 */
export const epad: <T extends AnyAction>(
  ...op: UnaryFunction<Observable<T>, Observable<T>>[]
) => ((source: Observable<T>) => Observable<T>) = (...op) => source =>
  new Observable(observer => {
    let actionIn = null;
    return source
      .pipe(
        tap(action => {
          actionIn = action;
        }),
        spreadPipe(...op),
        map(actionOut => ({
          ...actionIn,
          ...(<{}>actionOut)
        }))
      )
      .subscribe(toObserver(observer));
  });
