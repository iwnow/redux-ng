import { TestBed, inject } from '@angular/core/testing';

import { LoginFormStoreService } from './login-form-store.service';

describe('LoginFormStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginFormStoreService]
    });
  });

  it(
    'should be created',
    inject([LoginFormStoreService], (service: LoginFormStoreService) => {
      expect(service).toBeTruthy();
    })
  );
});
