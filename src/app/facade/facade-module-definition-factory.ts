import { Injectable } from '@angular/core';

import {
  ModuleDefinitionFactoryBase,
  ModuleDefinitionBase
} from '@vh/core/contracts';
import { FacadeModuleDefinition } from '@vh/facade/facade-module-definition';

@Injectable()
export class FacadeModuleDefinitionFactory extends ModuleDefinitionFactoryBase {
  createModuleDefinition(): ModuleDefinitionBase {
    return this.fmd;
  }

  constructor(protected fmd: FacadeModuleDefinition) {
    super();
  }
}
