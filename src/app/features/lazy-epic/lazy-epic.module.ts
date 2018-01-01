import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyEpicRoutingModule } from './lazy-epic-routing.module';
import { LazyEpicDemoComponent } from './components/lazy-epic-demo/lazy-epic-demo.component';
import { LazyEpicStoreService } from './redux/lazy-epic-store.service';
import * as tokens from './lazy-epic.di-tokens';
import { LazyEpicDuckService } from './redux/lazy-epic-duck.service';

@NgModule({
  imports: [
    CommonModule,
    LazyEpicRoutingModule
  ],
  declarations: [LazyEpicDemoComponent],
  providers: [
    { provide: tokens.LAZY_EPIC_MODULE_NAME, useValue: 'lazyEpicModule' },
    LazyEpicStoreService,
    LazyEpicDuckService
  ]
})
export class LazyEpicModule { }
