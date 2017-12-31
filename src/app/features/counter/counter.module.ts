import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CounterDuckService } from './redux/counter-duck.service';
import * as tokens from './counter.di-tokens';
import { CounterComponent } from './components/counter/counter.component';
import { CounterListComponent } from './components/counter-list/counter-list.component';
import { CounterStoreService } from './redux/counter-store.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: CounterListComponent
		}])
	],
	declarations: [
		CounterComponent,
		CounterListComponent
	],
	providers: [
		{ provide: tokens.COUNTER_MODULE_NAME, useValue: 'counterModule' },
		CounterDuckService,
		CounterStoreService
	]
})
export class CounterModule { }
