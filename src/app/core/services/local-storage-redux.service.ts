import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoggerService, ILog } from './logger.service';

import 'rxjs/add/operator/debounceTime';

@Injectable()
export class LocalStorageReduxService {
  readonly stateKey = 'redux-state';
  readonly saveStream: BehaviorSubject<any>;

  private readonly logger: ILog;

  constructor(
    private loggerSrv: LoggerService
  ) {
    this.logger = this.loggerSrv.createLogger(LocalStorageReduxService.name);
    this.saveStream = new BehaviorSubject(this.loadState());
    this.saveStream
      .debounceTime(1000)
      .subscribe(state => this.saveState(state));
  }

  loadState() {
    try {
      this.logger(this.loggerSrv.loggerTypes.info, 'loadState');
      const serializedState = localStorage && localStorage.getItem(this.stateKey);
      if (!serializedState)
        return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      this.logger(this.loggerSrv.loggerTypes.error, err);
      return undefined;
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage && localStorage.setItem(this.stateKey, serializedState);
      this.logger(this.loggerSrv.loggerTypes.info, 'saveState');
    } catch (err) {
      this.logger(this.loggerSrv.loggerTypes.error, err);
    }
  }

  saveStateDebounce(state) {
    this.saveStream.next(state);
  }

}
