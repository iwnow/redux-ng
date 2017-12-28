import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FacadeComponent } from './components/facade/facade.component';
import { ReduxModule } from './redux/redux.module';
import { CoreRouteModule } from './/core-route.module';

import {
  MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatIconModule,
  MatToolbarModule, MatSidenavModule, MatMenuModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ReduxEpicService } from './services/redux-epic.service';
import { LocalStorageReduxService } from './services/local-storage-redux.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  imports: [
    CommonModule,
    ReduxModule,
    CoreRouteModule,
    FormsModule,
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
    FlexLayoutModule
  ],
  declarations: [LoginComponent, FacadeComponent],
  exports: [
    CoreRouteModule
  ],
  providers: [IsAuthenticatedGuard, ReduxEpicService, LocalStorageReduxService, LoggerService]
})
export class CoreModule { }
