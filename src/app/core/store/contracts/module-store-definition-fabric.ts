import { ModuleStoreDefinitionBase } from './module-store-definition';

export abstract class ModuleStoreDefinitionFabricBase {
  abstract createModuleStoreDefinition(): ModuleStoreDefinitionBase;
}
