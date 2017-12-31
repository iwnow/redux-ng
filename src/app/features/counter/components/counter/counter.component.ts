import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
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

	@Output()
	increment: EventEmitter<number> = new EventEmitter();

	@Output()
	decrement: EventEmitter<number> = new EventEmitter();

	inc(e) {
		this.increment.emit(this.counter.id);
	}

	dec(e) {
		this.decrement.emit(this.counter.id);
	}
}
