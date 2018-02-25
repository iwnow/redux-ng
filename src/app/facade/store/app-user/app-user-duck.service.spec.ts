import { TestBed, inject } from '@angular/core/testing';

import { AppUserStoreService } from './app-user-store.service';

describe('AppUserStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppUserStoreService]
    });
  });

  it(
    'should be created',
    inject([AppUserStoreService], (service: AppUserStoreService) => {
      expect(service).toBeTruthy();
    })
  );
});
