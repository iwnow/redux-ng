import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  readonly loggerTypes = Object.freeze({
    error: 'error',
    info: 'info',
    warning: 'warning'
  });

  constructor() { }

  createLogger(moduleName: string) {
    return (type: string, data) => {
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

export type ILog = (type: string, data) => void;
