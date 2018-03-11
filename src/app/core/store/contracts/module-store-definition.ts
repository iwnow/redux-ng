import { Reducer, AnyAction } from 'redux';
import { AnyEpic } from '@vh/core/store/contracts';

/**базовый класс для описания стора модуля */
export abstract class ModuleStoreDefinitionBase {
  abstract get storeKey(): string;
  abstract get epic(): AnyEpic;
  abstract get reducer(): Reducer<any>;
  abstract get initialState(): any;

  createActionScope(scope: string) {
    if (!this.storeKey) throw new Error(`'storeKey' is not defined!`);
    if (!scope) throw new Error(`'scope' is not defined!`);

    return (action: string) => {
      if (!action) throw new Error(`'action' is not defined!`);
      return `${this.storeKey}/${scope}/${action}`;
    };
  }
}
