import { NgRedux } from '@angular-redux/store';
import { CounterActionService } from '../actions/counter';
import { ICounterState, IAppState } from '../state';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: 'counter.component.html'
})
export class AppCounterComponent {
  @Input()
  counter: ICounterState;

  constructor(
    private actionService: CounterActionService,
    private store: NgRedux<IAppState>
  ) {}

  inc(e) {
    this.store.dispatch(this.actionService.increment(this.counter.id));
  }

  dec(e) {
    this.store.dispatch(this.actionService.decrement(this.counter.id));
  }
}
