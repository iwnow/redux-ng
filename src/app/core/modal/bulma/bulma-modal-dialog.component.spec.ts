import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulmaModalDialogComponent } from './bulma-modal-dialog.component';

describe('BulmaModalDialogComponent', () => {
  let component: BulmaModalDialogComponent;
  let fixture: ComponentFixture<BulmaModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulmaModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulmaModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
