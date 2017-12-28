import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoggerCoreService, ILog, LogType } from '../../services/logger-core.service';

import 'rxjs/add/operator/debounceTime';

@Injectable()
export class ReduxLocalStorageCoreService {
  readonly stateKey = 'redux-state';
  readonly saveStream: BehaviorSubject<any>;

  private readonly logger: ILog;

  constructor(
    private loggerSrv: LoggerCoreService
  ) {
    this.logger = this.loggerSrv.createLogger(ReduxLocalStorageCoreService.name);
    this.saveStream = new BehaviorSubject(this.loadState());
    this.saveStream
      .debounceTime(1000)
      .subscribe(state => this.saveState(state));
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
    try {
      const serializedState = JSON.stringify(state);
      localStorage && localStorage.setItem(this.stateKey, serializedState);
      this.logger.log(LogType.info, 'saveState');
    } catch (err) {
      this.logger.log(LogType.error, err);
    }
  }

  saveStateDebounce(state) {
    this.saveStream.next(state);
  }

}
