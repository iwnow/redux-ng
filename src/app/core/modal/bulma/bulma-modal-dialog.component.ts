import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from '../modal-data';
import { ModalType } from '../modal-type';

@Component({
  selector: 'vh-bulma-modal-dialog',
  templateUrl: './bulma-modal-dialog.component.html',
  styleUrls: ['./bulma-modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BulmaModalDialogComponent implements OnInit {
  typeMsgClass: string[];

  constructor(
    public dialogRef: MatDialogRef<BulmaModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ModalData
  ) {}

  ngOnInit() {
    this.typeMsgClass = [
      'message',
      (() => {
        switch (this.dialogData.type) {
          case ModalType.primary:
            return 'is-primary';
          case ModalType.info:
            return 'is-info';
          case ModalType.success:
            return 'is-success';
          case ModalType.warning:
            return 'is-warning';
          case ModalType.danger:
            return 'is-danger';
          default:
            return 'is-primary';
        }
      })()
    ];
  }
}
