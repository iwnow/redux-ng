import { InjectionToken, ValueProvider } from '@angular/core';

/** Base path for feature module store inside root state */
export const MODULE_STORE_BASE_PATH = new InjectionToken<string>(
	'Base path for feature module store inside root state'
);
export const ROUTER_STORE_BASE_PATH = new InjectionToken<string>(
	'Base path for router store inside root state'
);

export const TOKEN_PROVIDERS_DEFAULT: ValueProvider[] = [
	{
		provide: MODULE_STORE_BASE_PATH,
		useValue: 'dynamicRootStore'
	},
	{
		provide: ROUTER_STORE_BASE_PATH,
		useValue: 'routerRootStore'
	}
]


