import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoggerService, ILog, LogType } from '../../diagnostics/logger';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class StoreLocalStorageService {
  readonly stateKey = 'StoreLocalStorageService';
  readonly saveState$: BehaviorSubject<any>;

  private readonly logger: ILog;

  constructor(
    private loggerSrv: LoggerService
  ) {
    this.logger = this.loggerSrv.createLoggerForThis(this);
    this.saveState$ = new BehaviorSubject(this.getState());
    this.saveState$.pipe(debounceTime(1000))
      .subscribe(state => this.save(state));
  }

  protected save(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage && localStorage.setItem(this.stateKey, serializedState);
      this.logger.log(LogType.info, 'saveState');
    } catch (err) {
      this.logger.log(LogType.warning, err);
    }
  }

  getState() {
    try {
      this.logger.log(LogType.info, 'loadState');
      const serializedState = localStorage && localStorage.getItem(this.stateKey);
      if (!serializedState)
        return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      this.logger.log(LogType.warning, err);
      return undefined;
    }
  }

  saveState(state) {
    this.saveState$.next(state);
  }

}
