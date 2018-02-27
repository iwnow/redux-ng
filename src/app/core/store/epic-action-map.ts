import { Observable } from 'rxjs/Observable';
import { AnyAction } from 'redux';
import { map, tap } from 'rxjs/operators';
import { UnaryFunction } from 'rxjs/interfaces';

const spreadPipe = (...operators) => <T>(source: Observable<T>) =>
  new Observable<T>(observer =>
    (<any>source).pipe(...operators).subscribe({
      next(x) {
        observer.next(x);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    })
  );

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
      .subscribe({
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
  });
