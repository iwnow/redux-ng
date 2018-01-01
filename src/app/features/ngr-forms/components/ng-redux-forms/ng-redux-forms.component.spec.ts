import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgReduxFormsComponent } from './ng-redux-forms.component';

describe('NgReduxFormsComponent', () => {
  let component: NgReduxFormsComponent;
  let fixture: ComponentFixture<NgReduxFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgReduxFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgReduxFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
