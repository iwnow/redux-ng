import { TestBed, inject } from '@angular/core/testing';

import { ReduxLocalStorageCoreService } from './redux-local-storage-core.service';

describe('LocalStorageReduxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxLocalStorageCoreService]
    });
  });

  it('should be created', inject([ReduxLocalStorageCoreService], (service: ReduxLocalStorageCoreService) => {
    expect(service).toBeTruthy();
  }));
});
