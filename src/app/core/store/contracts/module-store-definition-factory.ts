import { ModuleStoreDefinitionBase } from './module-store-definition';

export abstract class ModuleStoreDefinitionFactoryBase {
  abstract createModuleStoreDefinition(): ModuleStoreDefinitionBase;
}
