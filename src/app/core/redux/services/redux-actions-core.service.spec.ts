import { TestBed, inject } from '@angular/core/testing';

import { ReduxActionsCoreService } from './redux-actions-core.service';

describe('ReduxActionsCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxActionsCoreService]
    });
  });

  it('should be created', inject([ReduxActionsCoreService], (service: ReduxActionsCoreService) => {
    expect(service).toBeTruthy();
  }));
});
