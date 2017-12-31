import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICounter } from '../../redux/model';
import { CounterDuckService } from '../../redux/counter-duck.service';
import { CounterStoreService } from '../../redux/counter-store.service';

@Component({
	selector: 'app-counter',
	templateUrl: 'counter.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
	@Input()
	counter: ICounter;

	constructor(
		private counterDuck: CounterDuckService,
		private storeService: CounterStoreService
	) { }

	inc(e) {
		this.storeService.store
			.dispatch(this.counterDuck.createActionIncrement(this.counter.id));
	}

	dec(e) {
		this.storeService.store
			.dispatch(this.counterDuck.createActionDecrement(this.counter.id));
	}
}
