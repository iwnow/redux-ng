import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

interface IAbstractStore {
  dispatch: (action) => any;
  configureSubStore: (basePath, localReducre) => any;
  basePath: string[];
  replaceReducer: (reducer) => any;
  select: (...args) => any;
  getState: () => any;
  rootStore?: any;
}

@Directive({
  selector: '[connectReduxStore]'
})
export class ConnectReduxStoreDirective implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Input('connectReduxStore') path: string | string[];
  @Input() store: IAbstractStore;

  readonly actionFormUpdate = 'reduxShared/connect/UPDATE_FORM_VALUES';

  constructor() { }

  private static readonly mapStores: { [key: string]: IAbstractStore } = {};
  readonly subs = [];

  ngOnInit() {
    let fullPath = this.store.basePath
      ? this.store.basePath.concat(this.path)
      : this.path;
    fullPath = Array.isArray(fullPath) ? fullPath.join('.') : fullPath;

    const reducer = (state, action) => {
      if (action.type === this.actionFormUpdate) {
        return {
          ...action.payload
        }
      }
      return state;
    }

    if (!ConnectReduxStoreDirective.mapStores[fullPath])
      ConnectReduxStoreDirective.mapStores[fullPath] = this.store.configureSubStore(
        this.path,
        reducer
      );
    else
      ConnectReduxStoreDirective.mapStores[fullPath].replaceReducer(reducer);

    const formStore: IAbstractStore = ConnectReduxStoreDirective.mapStores[fullPath];

    let fromSelect = false;
    this.subs.push(
      this.formGroup.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(v => {
        if (fromSelect) {
          fromSelect = false;
          return;
        }

        formStore.dispatch({
          type: this.actionFormUpdate,
          payload: v
        })
      })
    );
    this.subs.push(
      this.store.select(this.path)
        .subscribe(value => {
          if (!value) return;
          fromSelect = true;
          this.formGroup.patchValue(value)
        })
    );
  }

  log(o) {
    console.log(o);
    return o;
  }
  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
