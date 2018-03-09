import { Injectable } from '@angular/core';
import { ModuleDefinitionFactoryBase } from '@vh/core/contracts';
import { CoreModuleDefinition } from './core-module-definition';

@Injectable()
export class CoreModuleDefinitionFactory
  implements ModuleDefinitionFactoryBase {
  createModuleDefinition() {
    return this.coreDef;
  }

  constructor(private coreDef: CoreModuleDefinition) {}
}
