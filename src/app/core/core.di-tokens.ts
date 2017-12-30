import { InjectionToken } from '@angular/core';

export const CORE_MODULE_NAME = new InjectionToken<string>('Core module name');
export const REDUX_DYNAMIC_STATE_PATH = new InjectionToken<string>('Redux state path for dynamic data in root object');
