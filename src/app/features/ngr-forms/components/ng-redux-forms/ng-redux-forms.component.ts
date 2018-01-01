import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgFormsStoreService } from '../../redux/ng-forms-store.service';

@Component({
  selector: 'app-ng-redux-forms',
  templateUrl: './ng-redux-forms.component.html',
  styleUrls: ['./ng-redux-forms.component.scss']
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

  connectPath;

  constructor(
    private fb: FormBuilder,
    public storeSrv: NgFormsStoreService
  ) {
    this.connectPath = [
      ...this.storeSrv.getBasePath(),
      'testForm'
    ]
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      autocomplete: ['']
    });
    this.filteredOptions = this.cAuto.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );

  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
