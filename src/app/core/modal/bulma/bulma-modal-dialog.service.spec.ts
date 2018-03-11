import { TestBed, inject } from '@angular/core/testing';

import { BulmaModalDialogService } from './bulma-modal-dialog.service';

describe('BulmaModalDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BulmaModalDialogService]
    });
  });

  it('should be created', inject([BulmaModalDialogService], (service: BulmaModalDialogService) => {
    expect(service).toBeTruthy();
  }));
});
