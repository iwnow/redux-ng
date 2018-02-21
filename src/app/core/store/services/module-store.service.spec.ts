import { TestBed, inject } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';

describe('ModuleStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleStoreService]
    });
  });

  it('should be created', inject([ModuleStoreService], (service: ModuleStoreService) => {
    expect(service).toBeTruthy();
  }));
});
