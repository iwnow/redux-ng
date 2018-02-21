import { Injectable } from '@angular/core';
import { LoggerService, ILog, LogType } from '../../diagnostics/logger';

export type IActionFabric = (action: string) => string;

@Injectable()
export class ReduxActionsCoreService {
  private readonly actionsSet: Set<string> = new Set();
  private readonly logger: ILog;

  constructor(
    private loggerSrv: LoggerService
  ) {
    this.logger = this.loggerSrv.createLogger(ReduxActionsCoreService.name);
  }

  createActionFabric(moduleName) {
    return (actionName) => `${moduleName}/${actionName}`;
  }

  registerActions(actions: string[]) {
    (actions || []).forEach(act => {
      if (this.actionsSet.has(act)) {
        const e = new Error(`duplicate action ${act}`);
        this.logger.log(LogType.error, e);
        throw e;
      }
      this.actionsSet.add(act);
    });
    return actions;
  }

}
