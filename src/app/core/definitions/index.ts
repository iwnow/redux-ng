import { CoreModuleDefinition } from './core-module-definition';
import { CoreModuleDefinitionFactory } from './core-module-definition-factory';
import { CoreModuleStoreDefinition } from './core-module-store-definition';
import { CoreModuleStoreDefinitionFactory } from './core-module-store-definition-factory';

const DEFINITION_PROVIDERS = [
  CoreModuleDefinition,
  CoreModuleDefinitionFactory,
  CoreModuleStoreDefinition,
  CoreModuleStoreDefinitionFactory
];

export {
  CoreModuleDefinition,
  CoreModuleDefinitionFactory,
  CoreModuleStoreDefinition,
  CoreModuleStoreDefinitionFactory,
  DEFINITION_PROVIDERS
};
