import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgrFormsRoutingModule } from './ngr-forms-routing.module';
import { NgReduxFormsComponent } from './components/ng-redux-forms/ng-redux-forms.component';
import { MaterialModule } from '../../shared/material/material.module';
import { NgFormsStoreService } from './redux/ng-forms-store.service';
import { NgFormsDuckService } from './redux/ng-forms-duck.service';
import { NgReduxFormModule } from '@angular-redux/form';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgReduxFormModule,
    NgrFormsRoutingModule,
    MaterialModule
  ],
  declarations: [NgReduxFormsComponent],
  providers: [NgFormsStoreService, NgFormsDuckService]
})
export class NgrFormsModule { }
