import { Epic } from 'redux-observable';
import { Reducer, AnyAction } from 'redux';

/**базовый класс для описания стора модуля */
export abstract class ModuleStoreDefinitionBase {
  abstract get storeKey(): string;
  abstract get epic(): Epic<AnyAction, any, any>;
  abstract get reducer(): Reducer<any>;
}
