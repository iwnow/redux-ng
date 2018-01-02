import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgFormsStoreService } from '../../redux/ng-forms-store.service';

@Component({
  selector: 'app-ng-redux-forms',
  templateUrl: './ng-redux-forms.component.html',
  styleUrls: ['./ng-redux-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgReduxFormsComponent implements OnInit {

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;
  formGroup: FormGroup;

  get cAuto() {
    return this.formGroup.get('autocomplete');
  }

  constructor(
    private fb: FormBuilder,
    public storeSrv: NgFormsStoreService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      autocomplete: [''],
      radio: [''],
      check1: [''],
      check2: [''],
      textarea: [''],
      input: [''],
      date: [null],
      select: [''],
      slider: [''],
      toggle: [''],
    });
    this.filteredOptions = this.cAuto.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
    //this.storeSrv.store.select(s => s && s.testForm).subscribe(console.log);
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      val && option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
