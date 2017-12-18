import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable';
import * as ducks from '../redux/ducks';

import 'rxjs/add/operator/mergeMap';

/**For Adding New Epics Asynchronously/Lazily
 * ReduxEpicService.registerEpic(newEpic1, newEpic2...)
*/
@Injectable()
export class ReduxEpicService {
  private rootEpicInternal;
  private epic$: BehaviorSubject<any>;

  get rootEpic() {
    return this.rootEpicInternal;
  }

  constructor() {
    this.epic$ = new BehaviorSubject(combineEpics(
      ...ducks.loginForm.epics
    ));
    this.rootEpicInternal = (action$, store) => this.epic$.mergeMap(ep => ep(action$, store));
  }

  registerEpic(epic) {
    this.epic$.next(epic);
  }

}
