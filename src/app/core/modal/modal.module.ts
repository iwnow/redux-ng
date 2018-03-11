import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatDividerModule } from '@angular/material';
import { BULMA_PROVIDERS, BULMA_DECLARATIONS } from './bulma';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatDividerModule],
  providers: [...BULMA_PROVIDERS],
  declarations: [...BULMA_DECLARATIONS],
  entryComponents: [...BULMA_DECLARATIONS]
})
export class ModalDialogModule {}
