import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModalDialogCoreComponent } from './info-modal-dialog-core.component';

describe('InfoModalDialogCoreComponent', () => {
  let component: InfoModalDialogCoreComponent;
  let fixture: ComponentFixture<InfoModalDialogCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoModalDialogCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModalDialogCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
