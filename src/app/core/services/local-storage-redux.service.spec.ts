import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageReduxService } from './local-storage-redux.service';

describe('LocalStorageReduxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageReduxService]
    });
  });

  it('should be created', inject([LocalStorageReduxService], (service: LocalStorageReduxService) => {
    expect(service).toBeTruthy();
  }));
});
