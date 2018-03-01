import { Injectable, ErrorHandler } from '@angular/core';
import { LoggerService, ILog, LogType } from '../diagnostics/logger';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy } from '@angular/common';

@Injectable()
export class ExceptionHandlerCoreService implements ErrorHandler {
  protected logger: ILog;

  constructor(
    private logsrv: LoggerService,
    private location: LocationStrategy
  ) {
    this.logger = logsrv.createLoggerForThis(this);
  }

  handleError(error: any): void {
    const message = error.message ? error.message : error.toString(),
      url = this.location.path();

    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes.splice(0, 20).join('\n');
      // log on the server
      this.logger.log(LogType.error, { message, url, stack: stackString });
    });

    // eat exception bad practice
    // throw error;'
  }
}
