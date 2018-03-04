import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './components/all/all.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AllComponent],
  exports: [AllComponent]
})
export class BulmaModule {}
