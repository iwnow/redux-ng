import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core';

import 'hammerjs';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //BrowserModule,
    BrowserAnimationsModule,
    //MatSliderModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
