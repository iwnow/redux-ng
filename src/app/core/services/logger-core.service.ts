import { Injectable } from '@angular/core';

export enum LogType {
  error = 'error',
  info = 'info',
  warning = 'warning'
}

@Injectable()
export class LoggerCoreService {
  readonly loggerTypes = Object.freeze({
    error: LogType.error,
    info: LogType.info,
    warning: LogType.warning
  });

  constructor() { }

  createLogger(moduleName: string) {
    return {
      log: (type: string, data) => {
        data = [`%c[LoggerService:${moduleName}]`, 'color:green;', data];
        switch (type) {
          case this.loggerTypes.error:
            this.errorLog(...data);
            break;
          case this.loggerTypes.info:
            this.infoLog(...data);
            break;
          case this.loggerTypes.warning:
            this.warnLog(...data);
            break;
          default:
            break;
        }
      }
    };
  }

  errorLog(...data) {
    console && console.error(...data);
  }

  infoLog(...data) {
    console && console.log(...data);
  }

  warnLog(...data) {
    console && console.warn(...data);
  }

}

export interface ILog {
  log: (type: string, data) => void;
}
