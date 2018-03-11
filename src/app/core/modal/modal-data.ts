import { TemplateRef } from '@angular/core';

export interface IModalData {
  templateRef: TemplateRef<any>;
  templateContext?: any;
  title?: string;
}
