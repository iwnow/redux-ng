import { Observable } from 'rxjs/Rx';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CounterDuckService } from '../../redux/counter-duck.service';
import { ICounter } from '../../redux/model';
import { CounterStoreService } from '../../redux/counter-store.service';

import { ActionCreators } from 'redux-undo';

@Component({
	selector: 'app-counter-list',
	templateUrl: 'counter-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterListComponent {
	counters$: Observable<ICounter[]>;

	constructor(
		private counterDuck: CounterDuckService,
		private storeService: CounterStoreService
	) {
		this.counters$ = this.storeService.store
			.select(state => state && state['present'] && state['present'].counters);
	}

	addCounter(e) {
		this.storeService.store.dispatch(this.counterDuck.createActionIncrementList());
	}

	removeCounter(e) {
		this.storeService.store.dispatch(this.counterDuck.createActionDecrementList());
	}

	incCounter(id) {
		this.storeService.store.dispatch(this.counterDuck.createActionIncrement(id))
	}

	decCounter(id) {
		this.storeService.store.dispatch(this.counterDuck.createActionDecrement(id))
	}

	undo(e) {
		this.storeService.store.dispatch(ActionCreators.undo());
	}

	redo(e) {
		this.storeService.store.dispatch(ActionCreators.redo());
	}
}
