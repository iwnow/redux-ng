import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics, Epic, ActionsObservable } from 'redux-observable';
import { mergeMap, map, ignoreElements } from 'rxjs/operators';
import { getStringHashCode } from '../../utils';

import { LoggerService, ILog, LogType } from '../../diagnostics/logger';
import { AnyAction } from 'redux';
import { Subject } from 'rxjs/Subject';

/**For Adding New Epics Asynchronously/Lazily
 * ReduxEpicService.registerEpic(newEpic1, newEpic2...)
 */
@Injectable()
export class StoreEpicService {
  protected rootEpicInternal: Epic<AnyAction, any>;
  protected epic$: BehaviorSubject<any>;
  protected logger: ILog;
  protected epics: object = {};

  get rootEpic() {
    return this.rootEpicInternal;
  }

  constructor(private logSrv: LoggerService) {
    this.logger = this.logSrv.createLoggerForThis(this);
  }

  createRootEpic(...epics: Epic<AnyAction, any>[]) {
    if (this.rootEpic) throw new Error('duplicate creating root epic!');

    epics = (epics || []).filter(e => !!e);
    epics.forEach(e => this.epics[getStringHashCode(e.toString())]);
    this.epic$ = new BehaviorSubject(combineEpics(...epics));
    this.rootEpicInternal = (action$, store, deps) =>
      this.epic$.pipe(mergeMap(ep => ep(action$, store, deps)));
    this.logger.log(LogType.info, 'root epic created');
    return this.rootEpic;
  }

  registerEpic(epic: Epic<AnyAction, any>) {
    if (!epic) return;
    if (!this.epic$)
      throw new Error(
        'Calling register epic before root epic is created. Root epic is not created yet!'
      );

    const hash = getStringHashCode(epic.toString());
    if (this.epics[hash])
      throw new Error(`duplicate epic register, ${epic.name}`);

    this.epics[hash] = true;
    this.epic$.next(epic);
    this.logger.log(LogType.info, `register epic ${epic && epic.name}`);
  }
}
