import { Injectable } from '@angular/core';
import { LoggerService, ILog, LogType } from '../../diagnostics/logger';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StoreLocalStorageService {
  readonly stateKey = 'StoreLocalStorageService';
  readonly saveState$: Subject<any>;

  private readonly logger: ILog;

  constructor(private loggerSrv: LoggerService) {
    this.logger = this.loggerSrv.createLoggerForThis(this);
    this.saveState$ = new Subject();
    this.saveState$
      .pipe(debounceTime(1000))
      .subscribe(({ state, key }) => this.save(state, key));
  }

  protected save(state, key) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage &&
        localStorage.setItem(`${this.stateKey}:${key}`, serializedState);
      this.logger.log(LogType.info, 'saveState');
    } catch (err) {
      this.logger.log(LogType.warning, err);
    }
  }

  getState(key) {
    try {
      this.logger.log(LogType.info, 'loadState');
      const serializedState =
        localStorage && localStorage.getItem(`${this.stateKey}:${key}`);
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      this.logger.log(LogType.warning, err);
      return undefined;
    }
  }

  saveState(state, key: string) {
    this.saveState$.next({ state, key });
  }
}
