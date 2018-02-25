import { Injectable, ErrorHandler, Inject } from '@angular/core';
import { LoggerService, ILog, LogType } from '../diagnostics/logger';

@Injectable()
export class ExceptionHandlerCoreService implements ErrorHandler {
  protected logger: ILog;

  constructor(logsrv: LoggerService) {
    this.logger = logsrv.createLogger(`core unhandled exception`);
  }

  handleError(error: any): void {
    this.logger.log(LogType.warning, error);
    // eat exception bad practice
  }
}
