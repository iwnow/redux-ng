import { TestBed, inject } from '@angular/core/testing';

import { CounterStoreService } from './counter-store.service';

describe('CounterStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterStoreService]
    });
  });

  it('should be created', inject([CounterStoreService], (service: CounterStoreService) => {
    expect(service).toBeTruthy();
  }));
});
