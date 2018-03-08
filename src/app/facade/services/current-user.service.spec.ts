import { TestBed, inject } from '@angular/core/testing';

import { CurrentAppUserService } from './current-user.service';

describe('CurrentUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentAppUserService]
    });
  });

  it(
    'should be created',
    inject([CurrentAppUserService], (service: CurrentAppUserService) => {
      expect(service).toBeTruthy();
    })
  );
});
