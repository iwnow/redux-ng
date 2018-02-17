import { Injectable } from '@angular/core';
import { ModuleDefinitionBase, ModuleStoreDefinitionBase } from '../base';
import { ModuleStoreCoreService } from './module-store-core.service';
import {
  LoggerCoreService,
  LogType,
  ILog
} from '../services/logger-core.service';

/**регистрирует модули, реализующие контракт ModuleDefinitionBase  */
@Injectable()
export class ModuleRegistrationCoreService {
  protected moduleDefinitions: Map<Symbol, ModuleDefinitionBase> = new Map();
  protected logger: ILog;

  constructor(
    private moduleStore: ModuleStoreCoreService,
    logger: LoggerCoreService
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
