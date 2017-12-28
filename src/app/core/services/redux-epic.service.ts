import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable';
import * as ducks from '../redux/ducks';

import 'rxjs/add/operator/mergeMap';
import { LoggerService } from './logger.service';

/**For Adding New Epics Asynchronously/Lazily
 * ReduxEpicService.registerEpic(newEpic1, newEpic2...)
*/
@Injectable()
export class ReduxEpicService {
  private rootEpicInternal;
  private epic$: BehaviorSubject<any>;
  private logger: (type: string, data) => void;

  get rootEpic() {
    return this.rootEpicInternal;
  }

  constructor(
    private logSrv: LoggerService
  ) {
    this.logger = this.logSrv.createLogger(ReduxEpicService.name);
    this.epic$ = new BehaviorSubject(combineEpics(
      ...ducks.loginForm.epics
    ));
    this.rootEpicInternal = (action$, store) => this.epic$.mergeMap(ep => ep(action$, store));
    this.logger(this.logSrv.loggerTypes.info, 'root epic creates');
  }

  registerEpic(epic) {
    this.epic$.next(epic);
    this.logger(this.logSrv.loggerTypes.info, `register epic ${epic && epic.name}`);
  }

}
