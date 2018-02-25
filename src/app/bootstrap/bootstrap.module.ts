import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';

import 'hammerjs';

import { FacadeModule } from '../facade';
import { BootstrapComponent } from './bootstrap.component';
import { CoreModule } from '../core';
import { RoutingModule } from '../routing';

const VENDOR_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  MatSliderModule // need hack angular material in lazy module for animation slider
];

@NgModule({
  declarations: [BootstrapComponent],
  imports: [...VENDOR_MODULES, RoutingModule, CoreModule, FacadeModule],
  bootstrap: [BootstrapComponent]
})
export class BootstrapModule {}
