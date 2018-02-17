import { TestBed, inject } from '@angular/core/testing';

import { ModuleStoreCoreService } from './module-store-core.service';

describe('ModuleStoreCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleStoreCoreService]
    });
  });

  it('should be created', inject([ModuleStoreCoreService], (service: ModuleStoreCoreService) => {
    expect(service).toBeTruthy();
  }));
});
