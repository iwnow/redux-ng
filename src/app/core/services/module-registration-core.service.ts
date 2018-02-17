import { Injectable } from '@angular/core';
import { ModuleDefinitionBase, ModuleStoreDefinitionBase } from '../base';

/**регистрирует модули, реализующие контракт ModuleDefinitionBase  */
@Injectable()
export class ModuleRegistrationCoreService {
  protected moduleDefinitions: Map<Symbol, ModuleDefinitionBase> = new Map();

  constructor() {}

  /**регистрация модуля
   * вызывается один раз при загрузке модуля в приложение
   */
  registerModule(moduleDef: ModuleDefinitionBase) {
    if (moduleDef) {
      if (this.moduleDefinitions.has(moduleDef.id))
        throw new Error(`module '${moduleDef.name}' has already registered!`);

      this.moduleDefinitions.set(moduleDef.id, moduleDef);

      // registering module store by definition
      this.configureModuleStore(moduleDef.storeDefinition);
    }
    return this;
  }

  protected configureModuleStore(storeDef: ModuleStoreDefinitionBase) {
    if (!storeDef) return;
  }
}
