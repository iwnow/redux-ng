import { Injectable, Type } from '@angular/core';

export enum LogType {
  error = 'error',
  info = 'info',
  warning = 'warning'
}

@Injectable()
export class LoggerService {
  readonly loggerTypes = Object.freeze({
    error: LogType.error,
    info: LogType.info,
    warning: LogType.warning
  });

  createLogger(moduleName: string): ILog {
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

  createLoggerForThis(that: any) {
    return that && that.constructor && this.createLogger(that.constructor.name);
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
