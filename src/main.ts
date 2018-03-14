import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BootstrapModule } from '@vh/bootstrap/bootstrap.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  const bootStart = Date.now();
  return platformBrowserDynamic()
    .bootstrapModule(BootstrapModule, {
      // defaultEncapsulation: ViewEncapsulation.None
    })
    .then(appRef => {
      const bootSeconds = Number(((Date.now() - bootStart) / 1000).toFixed(3));
      console.log(`application booting in ${bootSeconds} seconds`);
      return appRef;
    });
};

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console && console.error(err));
}
