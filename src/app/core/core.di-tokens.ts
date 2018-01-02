import { InjectionToken } from '@angular/core';

export const MODULE_NAME = new InjectionToken<string>('current module name');
export const REDUX_LAZY_BASE_PATH = new InjectionToken<string>('Redux state path for dynamic data in root object');
