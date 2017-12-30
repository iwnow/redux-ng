import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { CounterDuckService } from '../../redux/counter-duck.service';
import { ICounter } from '../../redux/model';
import { CounterStoreService } from '../../redux/counter-store.service';

@Component({
	selector: 'app-counter-list',
	templateUrl: 'counter-list.component.html'
})
export class CounterListComponent {
	counters$: Observable<ICounter[]>;

	constructor(
		private counterDuck: CounterDuckService,
		private storeService: CounterStoreService
	) {
		this.counters$ = this.storeService.store.select(state => {
			console.log(this.storeService);
			return state.counters || [];
		});
	}

	inc(e) {
		this.storeService.store.dispatch(this.counterDuck.createActionIncrementList());
	}

	dec(e) {
		this.storeService.store.dispatch(this.counterDuck.createActionDecrementList());
	}
}
