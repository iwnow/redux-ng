import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalData } from '../modal-data';
import { BulmaModalDialogComponent } from './bulma-modal-dialog.component';

@Injectable()
export class BulmaModalDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: ModalData, config?: MatDialogConfig) {
    let panelClass = ['vh-dialog-container'];
    if (config && config.panelClass) {
      if (Array.isArray(config.panelClass)) {
        panelClass = [...panelClass, ...config.panelClass];
      } else {
        panelClass = [...panelClass, config.panelClass];
      }
    }
    return this.dialog.open(BulmaModalDialogComponent, {
      data: data,
      ...config,
      panelClass
    });
  }
}
