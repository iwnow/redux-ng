import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatSliderModule
} from '@angular/material';

import { FacadeComponent } from './components/facade/facade.component';
import { LoginComponent } from './components/login/login.component';
import { FacadeAuthenticationGuard } from './guards/facade-authentication.guard';
import { FacadeModuleService } from './facade.service';
import { ModuleRegistrationCoreService } from '../core';
import {
  FacadeModuleStoreDefinition,
  AppUserDuckService,
  LoginFormDuckService
} from './store';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../features/dashboard';
import {
  StoreConfigureService,
  StoreLocalStorageService
} from '@vh/core/store/services';
import { MODULE_STORE_BASE_PATH } from '@vh/core/store';
import { environment } from '../../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentAppUserService } from './services/current-user.service';

@NgModule({
  imports: [
    // ANGULAR
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // VALHALLA
    DashboardModule,
    // MATERIAL
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatSliderModule
  ],
  declarations: [FacadeComponent, LoginComponent],
  exports: [FacadeComponent, LoginComponent],
  providers: [
    FacadeAuthenticationGuard,
    FacadeModuleService,
    FacadeModuleStoreDefinition,
    AppUserDuckService,
    LoginFormDuckService,
    CurrentAppUserService
  ]
})
export class FacadeModule {
  constructor(
    protected moduleReg: ModuleRegistrationCoreService,
    protected facadeModule: FacadeModuleService,
    protected storeRootConfiguration: StoreConfigureService,
    protected localStorage: StoreLocalStorageService,
    @Inject(MODULE_STORE_BASE_PATH) protected dynamicStorePath: string
  ) {
    this.configureStore();
  }

  configureStore() {
    const facadeStoreKey = this.facadeModule.storeDefinition.storeKey;
    const facadeInitialState = this.localStorage.getState(facadeStoreKey);
    const rootStore = this.storeRootConfiguration.configure({
      devTools: !environment.production,
      epic: null,
      initialState: {
        [this.dynamicStorePath]: {
          [facadeStoreKey]: facadeInitialState
        }
      },
      reducers: {}
    });
    rootStore
      .select(
        s =>
          s[this.dynamicStorePath] && s[this.dynamicStorePath][facadeStoreKey]
      )
      .subscribe(facadestate =>
        this.localStorage.saveState(facadestate, facadeStoreKey)
      );

    this.moduleReg.registerModule(this.facadeModule);
  }
}
