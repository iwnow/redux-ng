import { Injectable, Type, Optional } from '@angular/core';

export enum LogType {
  error = 'error',
  info = 'info',
  warning = 'warning'
}

export interface ILoggerServiceOptions {
  name?: string;
}

@Injectable()
export class LoggerService {
  readonly loggerTypes = Object.freeze({
    error: LogType.error,
    info: LogType.info,
    warning: LogType.warning
  });
  protected options: ILoggerServiceOptions = {
    name: ''
  };

  setOptions(opts: ILoggerServiceOptions) {
    if (opts)
      this.options = {
        ...this.options,
        ...opts
      };
    return this;
  }

  createLogger(scope?: string): ILog {
    const scopes = ['LoggerService'];
    if (this.options.name) scopes.push(this.options.name);
    if (scope) scopes.push(scope);

    const prefix = scopes.map(s => `[${s}]`).join('');

    return {
      log: (type: string, data) => {
        data = [`%c${prefix}`, 'color:green;', data];
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
