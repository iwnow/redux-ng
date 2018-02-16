import { Injectable, Inject } from '@angular/core';
import { ReduxActionsCoreService, DuckCoreBase } from '../../../core';
import { MODULE_NAME } from '../../../core';
import { Action, Reducer } from 'redux';
import { ILazyEpicModuleStore } from './model';
import { ActionsObservable } from 'redux-observable';
import { LoggerCoreService } from '../../../core/services/logger-core.service';

@Injectable()
export class LazyEpicDuckService extends DuckCoreBase {
  private actions = Object.freeze({
    ping: this.actionFabric('PING'),
    pong: this.actionFabric('PONG')
  });

  constructor(
    actionService: ReduxActionsCoreService,
    @Inject(MODULE_NAME) moduleName,
    private logger: LoggerCoreService
  ) {
    super(actionService, moduleName);
  }

  getActions(): string[] {
    return Object.values(this.actions);
  }
  getEpics(): any[] {
    return [this.pingPongEpic];
  }

  createActionPing(): Action {
    return {
      type: this.actions.ping
    };
  }

  createActionPong(): Action {
    return {
      type: this.actions.pong
    };
  }

  readonly reducer: Reducer<ILazyEpicModuleStore> = (state, action) => {
    switch (action.type) {
      case this.actions.ping:
        return {
          state: 'PING'
        };
      case this.actions.pong:
        return {
          state: 'PONG'
        };
      default:
        break;
    }

    return (
      state || {
        state: 'PING'
      }
    );
  };

  readonly pingPongEpic = (action$: ActionsObservable<Action>) => {
    return action$
      .ofType(this.actions.ping)
      .delay(1000)
      .map(action => ({
        // fractal store metadata loose
        ...action,
        ...this.createActionPong()
      }));
  };
}
