import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyEpicRoutingModule } from './lazy-epic-routing.module';
import { LazyEpicDemoComponent } from './components/lazy-epic-demo/lazy-epic-demo.component';
import { LazyEpicStoreService } from './redux/lazy-epic-store.service';
import { MODULE_NAME } from '../../core';
import { LazyEpicDuckService } from './redux/lazy-epic-duck.service';

@NgModule({
  imports: [
    CommonModule,
    LazyEpicRoutingModule
  ],
  declarations: [LazyEpicDemoComponent],
  providers: [
    { provide: MODULE_NAME, useValue: 'LazyEpicModule' },
    LazyEpicStoreService,
    LazyEpicDuckService
  ]
})
export class LazyEpicModule { }
