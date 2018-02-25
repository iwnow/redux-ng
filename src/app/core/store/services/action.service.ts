import { Injectable } from '@angular/core';

@Injectable()
export class ActionService {
  protected actions: Object = {};

  constructor() {}

  registerAction(action: string) {
    if (this.actions.hasOwnProperty(action))
      throw new Error(`duplicate register action ${action}`);
    this.actions[action] = 1;
    return this;
  }

  has(action: string) {
    return this.actions.hasOwnProperty(action);
  }
}
