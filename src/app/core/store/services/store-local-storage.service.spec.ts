import { TestBed, inject } from '@angular/core/testing';

import { StoreLocalStorageService } from './store-local-storage.service';

describe('StoreLocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreLocalStorageService]
    });
  });

  it('should be created', inject([StoreLocalStorageService], (service: StoreLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
