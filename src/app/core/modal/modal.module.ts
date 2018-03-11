import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODAL_PROVIDERS } from './services';
import { MODAL_DECLARATIONS } from './components';
import { MatDialogModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatDividerModule],
  providers: [...MODAL_PROVIDERS],
  declarations: [...MODAL_DECLARATIONS],
  entryComponents: [...MODAL_DECLARATIONS]
})
export class ModalDialogModule {}
