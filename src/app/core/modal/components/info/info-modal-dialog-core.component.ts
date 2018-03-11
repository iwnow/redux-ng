import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModalData } from '../../modal-data';

@Component({
  selector: 'vh-info-modal-dialog-core',
  templateUrl: './info-modal-dialog-core.component.html',
  styleUrls: ['./info-modal-dialog-core.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoModalDialogCoreComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoModalDialogCoreComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IModalData
  ) {}

  ngOnInit() {}
}
