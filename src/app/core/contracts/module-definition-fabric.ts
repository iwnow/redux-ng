import { ModuleDefinitionBase } from './module-definition';

/**фабрика для создания описания модуля */
export abstract class ModuleDefinitionFabricBase {
  abstract createModuleDefinition(): ModuleDefinitionBase;
}
