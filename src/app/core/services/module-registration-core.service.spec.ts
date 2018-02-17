import { TestBed, inject } from '@angular/core/testing';

import { ModuleRegistrationCoreService } from './module-registration-core.service';

describe('ModuleRegistrationCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleRegistrationCoreService]
    });
  });

  it('should be created', inject([ModuleRegistrationCoreService], (service: ModuleRegistrationCoreService) => {
    expect(service).toBeTruthy();
  }));
});
