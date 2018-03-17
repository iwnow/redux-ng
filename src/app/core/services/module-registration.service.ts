import { Injectable } from '@angular/core';
import {
  ModuleDefinitionBase,
  ModuleDefinitionFactoryBase
} from '../contracts';
import { ModuleStoreService } from '../store/services';
import { LoggerService, LogType, ILog } from '../diagnostics/logger';
import { ModuleStoreDefinitionBase } from '@vh/core/store/contracts';

/**регистрирует модули, реализующие контракт ModuleDefinitionBase  */
@Injectable()
export class ModuleRegistrationService {
  protected moduleDefinitions: Map<Symbol, ModuleDefinitionBase> = new Map();
  protected moduleStoreDefinitions: Map<Symbol, ModuleStoreDefinitionBase> = new Map();
  protected logger: ILog;

  get modules() {
    return Array.from(this.moduleDefinitions.values()).map(
      ({ name, description, version }) => ({ name, description, version })
    );
  }

  constructor(private moduleStore: ModuleStoreService, logger: LoggerService) {
    this.logger = logger.createLogger('ModuleRegistrationService');
  }

  /**регистрация модуля
   * вызывается один раз при загрузке модуля в приложение
   */
  registerModuleFactory(moduleDefFactory: ModuleDefinitionFactoryBase) {
    if (!moduleDefFactory) {
      this.logger.log(
        LogType.warning,
        'Передана пустая фабрика при регистрации модуля'
      );
      return this;
    }
    const moduleDef = moduleDefFactory.createModuleDefinition();
    if (!moduleDef || !moduleDef.id) {
      this.logger.log(
        LogType.warning,
        new Error(
          `Не корректное описание модуля (ModuleDefinitionBase), св-во 'id' должно быть задано`
        )
      );
      return this;
    }

    if (this.moduleDefinitions.has(moduleDef.id))
      throw new Error(`Дублирование регистрации модуля '${moduleDef.name}'!`);

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

  getModuleStore(moduleId: Symbol) {
    return (
      moduleId &&
      this.moduleStoreDefinitions.get(moduleId) &&
      this.moduleStore.getModuleStore(this.moduleStoreDefinitions.get(moduleId))
    );
  }
}
