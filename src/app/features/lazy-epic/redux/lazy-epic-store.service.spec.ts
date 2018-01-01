import { TestBed, inject } from '@angular/core/testing';

import { LazyEpicStoreService } from './lazy-epic-store.service';

describe('LazyEpicStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyEpicStoreService]
    });
  });

  it('should be created', inject([LazyEpicStoreService], (service: LazyEpicStoreService) => {
    expect(service).toBeTruthy();
  }));
});
