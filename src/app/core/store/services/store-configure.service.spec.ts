import { TestBed, inject } from '@angular/core/testing';

import { StoreConfigureService } from './store-configure.service';

describe('StoreConfigureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreConfigureService]
    });
  });

  it('should be created', inject([StoreConfigureService], (service: StoreConfigureService) => {
    expect(service).toBeTruthy();
  }));
});
