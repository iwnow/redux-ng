import { Injectable, Inject, ErrorHandler } from '@angular/core';
import { MODULE_NAME } from '../../../core';
import {
  ILog,
  LoggerCoreService,
  LogType
} from '../../../core/services/logger-core.service';

@Injectable()
export class ExceptionHandlerService implements ErrorHandler {
  protected logger: ILog;

  constructor(@Inject(MODULE_NAME) moduleName, logsrv: LoggerCoreService) {
    this.logger = logsrv.createLogger(moduleName);
  }

  handleError(error: any): void {
    this.logger.log(LogType.error, error);
    throw error;
  }
}
