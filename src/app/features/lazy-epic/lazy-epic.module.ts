import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyEpicRoutingModule } from './lazy-epic-routing.module';
import { LazyEpicDemoComponent } from './components/lazy-epic-demo/lazy-epic-demo.component';
import { LazyEpicStoreService } from './redux/lazy-epic-store.service';
import { MODULE_NAME } from '../../core';
import { LazyEpicDuckService } from './redux/lazy-epic-duck.service';
import { ExceptionHandlerService } from './services/exception-handler.service';

@NgModule({
  imports: [CommonModule, LazyEpicRoutingModule],
  declarations: [LazyEpicDemoComponent],
  providers: [
    { provide: MODULE_NAME, useValue: 'LazyEpicModule' },
    { provide: ErrorHandler, useClass: ExceptionHandlerService },
    LazyEpicStoreService,
    LazyEpicDuckService,
    ExceptionHandlerService
  ]
})
export class LazyEpicModule {}
