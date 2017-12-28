import { TestBed, inject } from '@angular/core/testing';

import { LoginFormDuckCoreService } from './login-form-duck-core.service';

describe('LoginFormDuckCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginFormDuckCoreService]
    });
  });

  it('should be created', inject([LoginFormDuckCoreService], (service: LoginFormDuckCoreService) => {
    expect(service).toBeTruthy();
  }));
});
