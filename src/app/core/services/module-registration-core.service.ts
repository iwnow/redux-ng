import { Injectable } from '@angular/core';
import { ModuleDefinitionBase } from '../contracts';
import { ModuleStoreService } from '../store/services';
import {
  LoggerService,
  LogType,
  ILog
} from '../diagnostics/logger';

/**регистрирует модули, реализующие контракт ModuleDefinitionBase  */
@Injectable()
export class ModuleRegistrationCoreService {
  protected moduleDefinitions: Map<Symbol, ModuleDefinitionBase> = new Map();
  protected logger: ILog;

  constructor(
    private moduleStore: ModuleStoreService,
    logger: LoggerService
  ) {
    this.logger = logger.createLoggerForThis(this);
  }

  /**регистрация модуля
   * вызывается один раз при загрузке модуля в приложение
   */
  registerModule(moduleDef: ModuleDefinitionBase) {
    if (!moduleDef || !moduleDef.id) {
      this.logger.log(
        LogType.warning,
        new Error(`module is not registered, 'id' is not defined`)
      );
      return this;
    }

    if (this.moduleDefinitions.has(moduleDef.id))
      throw new Error(`duplicate registering module '${moduleDef.name}'!`);

    this.moduleDefinitions.set(moduleDef.id, moduleDef);

    // registering module store by definition
    this.moduleStore.registerModuleStore(moduleDef.storeDefinition);
    return this;
  }

  getModuleStore<StoreType>(moduleDef: ModuleDefinitionBase) {
    return (
      moduleDef &&
      moduleDef.storeDefinition &&
      this.moduleStore.getModuleStore<StoreType>(moduleDef.storeDefinition)
    );
  }
}
