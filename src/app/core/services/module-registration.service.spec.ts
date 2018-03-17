import { TestBed, inject } from '@angular/core/testing';

import { ModuleRegistrationService } from './module-registration.service';

describe('ModuleRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleRegistrationService]
    });
  });

  it('should be created', inject([ModuleRegistrationService], (service: ModuleRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
