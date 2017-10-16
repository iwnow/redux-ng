import { CounterActionService } from '../actions/counter';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IAppState, ICounterState } from '../state';

@Component({
  selector: 'app-counter-list',
  templateUrl: 'counter-list.component.html'
})
export class AppCounterListComponent {
  @select()
  counters$: Observable<ICounterState[]>;

  constructor(
    private actionService: CounterActionService,
    private store: NgRedux<IAppState>
  ) {}

  inc(e) {
    this.store.dispatch(this.actionService.incrementList());
  }

  dec(e) {
    this.store.dispatch(this.actionService.decrementList());
  }
}
