import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule, MatOptionModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatIconModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule,
  MatTabsModule, MatProgressBarModule, MatSelectModule, MatToolbarModule,
  MatRadioModule, MatSliderModule, MatSlideToggleModule, MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule
  ]
})
export class MaterialModule { }
