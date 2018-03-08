import { ModuleDefinitionBase } from './module-definition';

/**фабрика для создания описания модуля */
export abstract class ModuleDefinitionFactoryBase {
  abstract createModuleDefinition(): ModuleDefinitionBase;
}
