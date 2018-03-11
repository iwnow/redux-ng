import { TemplateRef } from '@angular/core';
import { ModalType } from './modal-type';

export class ModalData {
  templateRef: TemplateRef<any>;
  templateContext?: any;
  title?: string;
  type?: ModalType;
}
