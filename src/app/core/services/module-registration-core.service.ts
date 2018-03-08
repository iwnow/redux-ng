import { Injectable } from '@angular/core';
import { ModuleDefinitionBase } from '../contracts';
import { ModuleStoreService } from '../store/services';
import { LoggerService, LogType, ILog } from '../diagnostics/logger';
import { ModuleStoreDefinitionBase } from '@vh/core/store/contracts';

/**регистрирует модули, реализующие контракт ModuleDefinitionBase  */
@Injectable()
export class ModuleRegistrationCoreService {
  protected moduleDefinitions: Map<Symbol, ModuleDefinitionBase> = new Map();
  protected moduleStoreDefinitions: Map<
    Symbol,
    ModuleStoreDefinitionBase
  > = new Map();
  protected logger: ILog;

  constructor(private moduleStore: ModuleStoreService, logger: LoggerService) {
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
    const moduleStoreDef =
      moduleDef.storeDefinitionFactory &&
      moduleDef.storeDefinitionFactory.createModuleStoreDefinition();
    if (moduleStoreDef) {
      this.moduleStoreDefinitions.set(moduleDef.id, moduleStoreDef);
      this.moduleStore.registerModuleStore(moduleStoreDef);
    }
    return this;
  }

  getModuleStore<StoreType>(moduleDef: ModuleDefinitionBase) {
    const storeDef = moduleDef && this.moduleStoreDefinitions.get(moduleDef.id);
    return storeDef && this.moduleStore.getModuleStore<StoreType>(storeDef);
  }
}
