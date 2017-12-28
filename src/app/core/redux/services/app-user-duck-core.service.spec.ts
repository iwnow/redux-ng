import { TestBed, inject } from '@angular/core/testing';

import { AppUserDuckCoreService } from './app-user-duck-core.service';

describe('AppUserDuckCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppUserDuckCoreService]
    });
  });

  it('should be created', inject([AppUserDuckCoreService], (service: AppUserDuckCoreService) => {
    expect(service).toBeTruthy();
  }));
});
