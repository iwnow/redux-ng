import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BootstrapModule } from './app/bootstrap/bootstrap.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootStart = Date.now();
platformBrowserDynamic().bootstrapModule(BootstrapModule)
  .then(appRef => {
    const bootSeconds = Number(((Date.now() - bootStart) / 1000).toFixed(3));
    console.log(`application booting in ${bootSeconds} seconds`);
  })
  .catch(err => console && console.error(err));
