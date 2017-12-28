import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoggerCoreService, ILog, LogType } from '../../services/logger-core.service';

import 'rxjs/add/operator/debounceTime';

@Injectable()
export class ReduxLocalStorageCoreService {
  readonly stateKey = 'redux-state';
  readonly saveState$: BehaviorSubject<any>;

  private readonly logger: ILog;

  constructor(
    private loggerSrv: LoggerCoreService
  ) {
    this.logger = this.loggerSrv.createLogger(ReduxLocalStorageCoreService.name);
    this.saveState$ = new BehaviorSubject(this.loadState());
    this.saveState$
      .debounceTime(1000)
      .subscribe(state => this.save(state));
  }

  private save(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage && localStorage.setItem(this.stateKey, serializedState);
      this.logger.log(LogType.info, 'saveState');
    } catch (err) {
      this.logger.log(LogType.error, err);
    }
  }

  loadState() {
    try {
      this.logger.log(LogType.info, 'loadState');
      const serializedState = localStorage && localStorage.getItem(this.stateKey);
      if (!serializedState)
        return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      this.logger.log(LogType.error, err);
      return undefined;
    }
  }

  saveState(state) {
    this.saveState$.next(state);
  }

}
