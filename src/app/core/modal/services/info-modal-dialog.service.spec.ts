import { TestBed, inject } from '@angular/core/testing';

import { InfoModalDialogService } from './info-modal-dialog.service';

describe('InfoModalDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoModalDialogService]
    });
  });

  it('should be created', inject([InfoModalDialogService], (service: InfoModalDialogService) => {
    expect(service).toBeTruthy();
  }));
});
