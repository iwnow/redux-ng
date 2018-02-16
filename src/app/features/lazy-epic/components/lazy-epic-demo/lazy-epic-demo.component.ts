import { Component, OnInit } from '@angular/core';
import { LazyEpicStoreService } from '../../redux/lazy-epic-store.service';
import { LazyEpicDuckService } from '../../redux/lazy-epic-duck.service';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-lazy-epic-demo',
  templateUrl: './lazy-epic-demo.component.html',
  styleUrls: ['./lazy-epic-demo.component.scss']
})
export class LazyEpicDemoComponent implements OnInit {
  state$: Observable<string>;

  constructor(
    private store: LazyEpicStoreService,
    private duck: LazyEpicDuckService
  ) {
    this.state$ = store.store.select(s => s && s.state);
  }

  ngOnInit() {}

  pingClick() {
    this.store.store.dispatch(this.duck.createActionPing());
  }

  testException(): never {
    throw new Error('test exception in lazy-epic module component');
  }
}
