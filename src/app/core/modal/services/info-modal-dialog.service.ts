import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IModalData } from '../modal-data';
import { InfoModalDialogCoreComponent } from '../components';

@Injectable()
export class InfoModalDialogService {
  constructor(public dialog: MatDialog) {}

  open(data: IModalData) {
    return this.dialog.open(InfoModalDialogCoreComponent, {
      data: data,
      panelClass: ['vh-info-dialog-container']
    });
  }
}
