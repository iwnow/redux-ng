import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable';

import 'rxjs/add/operator/mergeMap';
import {
  LoggerCoreService,
  ILog,
  LogType
} from '../../services/logger-core.service';
import { LoginFormDuckCoreService } from './login-form-duck-core.service';
import { AppUserDuckCoreService } from './app-user-duck-core.service';

/**For Adding New Epics Asynchronously/Lazily
 * ReduxEpicService.registerEpic(newEpic1, newEpic2...)
 */
@Injectable()
export class ReduxEpicCoreService {
  private rootEpicInternal;
  private epic$: BehaviorSubject<any>;
  private logger: ILog;

  get rootEpic() {
    return this.rootEpicInternal;
  }

  constructor(
    private logSrv: LoggerCoreService,
    private loginFormDuck: LoginFormDuckCoreService,
    private appUserDuck: AppUserDuckCoreService
  ) {
    this.logger = this.logSrv.createLogger(ReduxEpicCoreService.name);
    this.epic$ = new BehaviorSubject(
      combineEpics(
        ...this.loginFormDuck.getEpics(),
        ...this.appUserDuck.getEpics()
      )
    );
    this.rootEpicInternal = (action$, store) =>
      this.epic$.mergeMap(ep => ep(action$, store));
    this.logger.log(LogType.info, 'root epic creates');
  }

  registerEpic(epic) {
    if (!epic) return;

    this.epic$.next(epic);
    this.logger.log(LogType.info, `register epic ${epic && epic.name}`);
  }
}
