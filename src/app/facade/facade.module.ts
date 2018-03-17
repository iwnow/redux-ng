import { NgModule, Inject, forwardRef } from '@angular/core';
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
  MatSliderModule,
  MatDividerModule
} from '@angular/material';

import { FacadeComponent } from './components/facade/facade.component';
import { LoginComponent } from './components/login/login.component';
import { FacadeAuthenticationGuard } from './guards/facade-authentication.guard';
import { ModuleRegistrationService } from '../core';
import { AppUserDuckService, LoginFormDuckService } from './store';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../features/dashboard';
import {
  StoreConfigureService,
  StoreLocalStorageService,
  ModuleStoreService
} from '@vh/core/store/services';
import { MODULE_STORE_BASE_PATH } from '@vh/core/store';
import { environment } from '../../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentAppUserService } from './services/current-user.service';
import { FacadeModuleDefinitionFactory } from './facade-module-definition-factory';
import { FacadeModuleStoreDefinitionFactory } from './facade-module-store-definition-factory';
import { FacadeModuleDefinition } from './facade-module-definition';
import { FacadeModuleStoreDefinition } from './facade-module-store-definition';
import { FacadeStoreService } from './services/facade-store.service';

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
    MatSliderModule,
    MatDividerModule
  ],
  declarations: [FacadeComponent, LoginComponent],
  exports: [FacadeComponent, LoginComponent],
  providers: [
    FacadeModuleDefinitionFactory,
    FacadeModuleStoreDefinitionFactory,
    FacadeModuleDefinition,
    FacadeModuleStoreDefinition,
    FacadeAuthenticationGuard,
    AppUserDuckService,
    LoginFormDuckService,
    CurrentAppUserService,
    FacadeStoreService
  ]
})
export class FacadeModule {
  constructor(
    moduleReg: ModuleRegistrationService,
    facadeMdf: FacadeModuleDefinitionFactory,
    facadeMsd: FacadeModuleStoreDefinition,
    facadeMd: FacadeModuleDefinition,
    ls: StoreLocalStorageService
  ) {
    const store = moduleReg
      .registerModuleFactory(facadeMdf)
      .getModuleStore(facadeMd.id);

    store.subscribe(() => {
      ls.saveState(store.getState(), facadeMsd.storeKey);
    });
  }
}
