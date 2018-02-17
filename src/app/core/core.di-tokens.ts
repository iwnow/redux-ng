import { InjectionToken } from '@angular/core';

export const MODULE_NAME = new InjectionToken<string>('current module name');
/**@deprecated use token MODULE_STORE_BASE_PATH instead*/
export const REDUX_LAZY_BASE_PATH = new InjectionToken<string>(
  'Redux state path for dynamic data in root object'
);
export const MODULE_STORE_BASE_PATH = new InjectionToken<string>(
  'Base path for modules store in root state'
);
