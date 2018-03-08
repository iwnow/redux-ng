import { TestBed, inject } from '@angular/core/testing';

import { FacadeStoreService } from './facade-store.service';

describe('FacadeStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacadeStoreService]
    });
  });

  it('should be created', inject([FacadeStoreService], (service: FacadeStoreService) => {
    expect(service).toBeTruthy();
  }));
});
