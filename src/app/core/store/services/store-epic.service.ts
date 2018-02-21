import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators'

import {
  LoggerService,
  ILog,
  LogType
} from '../../diagnostics/logger';

/**For Adding New Epics Asynchronously/Lazily
 * ReduxEpicService.registerEpic(newEpic1, newEpic2...)
 */
@Injectable()
export class StoreEpicService {
  private rootEpicInternal;
  private epic$: BehaviorSubject<any>;
  private logger: ILog;

  get rootEpic() {
    return this.rootEpicInternal;
  }

  constructor(
    private logSrv: LoggerService
  ) {
    this.logger = this.logSrv.createLoggerForThis(this);
    this.epic$ = new BehaviorSubject(combineEpics([]));
    this.rootEpicInternal = (action$, store) =>
      this.epic$.pipe(
        mergeMap(ep => ep(action$, store))
      );
    this.logger.log(LogType.info, 'root epic created');
  }

  registerEpic(epic) {
    if (!epic) return;

    this.epic$.next(epic);
    this.logger.log(LogType.info, `register epic ${epic && epic.name}`);
  }
}
