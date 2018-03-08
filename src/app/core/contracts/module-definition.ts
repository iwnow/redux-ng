import { Epic } from 'redux-observable';
import { Reducer, AnyAction } from 'redux';

import { ModuleStoreDefinitionFactoryBase } from '../store/contracts';

/** Контракт для регистрации модулей подсистем
 * содержит описание модуля, предоставляет информацию о конфигурации Store
 * возможны расширения в дальнейшем...
 */
export abstract class ModuleDefinitionBase {
  readonly id: Symbol = Symbol();

  abstract get name(): string;
  abstract get description(): string;
  abstract get version(): string;

  abstract get storeDefinitionFactory(): ModuleStoreDefinitionFactoryBase;
  // abstract get store();
  // abstract get state();
}
