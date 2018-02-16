import { Injectable, ErrorHandler, Inject } from '@angular/core';
import {
  LoggerCoreService,
  ILog,
  LogType
} from '../services/logger-core.service';
import { MODULE_NAME } from '../core.di-tokens';

@Injectable()
export class ExceptionHandlerCoreService implements ErrorHandler {
  protected logger: ILog;

  constructor(logsrv: LoggerCoreService, @Inject(MODULE_NAME) moduleName) {
    this.logger = logsrv.createLogger(`${moduleName}:Unhandled Exception`);
  }

  handleError(error: any): void {
    this.logger.log(LogType.warning, error);
    // eat exception bad practice
  }
}
