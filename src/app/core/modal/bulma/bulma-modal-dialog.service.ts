import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalData } from '../modal-data';
import { BulmaModalDialogComponent } from './bulma-modal-dialog.component';

@Injectable()
export class BulmaModalDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: ModalData) {
    return this.dialog.open(BulmaModalDialogComponent, {
      data: data,
      panelClass: ['vh-dialog-container']
    });
  }
}
