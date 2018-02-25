import { NgModule } from '@angular/core';
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
import { FacadeModuleDefinition } from './facade.definition';
import { ModuleRegistrationCoreService } from '../core';
import {
  FacadeModuleStoreDefinition,
  FacadeStoreService,
  AppUserStoreService,
  LoginFormStoreService
} from './store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    FacadeModuleDefinition,
    FacadeModuleStoreDefinition,
    FacadeStoreService,
    AppUserStoreService,
    LoginFormStoreService
  ]
})
export class FacadeModule {
  constructor(
    protected moduleReg: ModuleRegistrationCoreService,
    protected def: FacadeModuleDefinition
  ) {
    moduleReg.registerModule(def);
  }
}
