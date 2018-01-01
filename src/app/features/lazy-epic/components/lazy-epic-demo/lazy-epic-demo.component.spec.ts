import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyEpicDemoComponent } from './lazy-epic-demo.component';

describe('LazyEpicDemoComponent', () => {
  let component: LazyEpicDemoComponent;
  let fixture: ComponentFixture<LazyEpicDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyEpicDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyEpicDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
