import { TestBed, async, inject } from '@angular/core/testing';

import { FacadeAuthenticationGuard } from './facade-authentication.guard';

describe('FacadeAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacadeAuthenticationGuard]
    });
  });

  it('should ...', inject([FacadeAuthenticationGuard], (guard: FacadeAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
