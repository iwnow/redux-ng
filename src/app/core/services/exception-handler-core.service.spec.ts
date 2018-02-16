import { TestBed, inject } from '@angular/core/testing';

import { ExceptionHandlerCoreService } from './exception-handler-core.service';

describe('ExceptionHandlerCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExceptionHandlerCoreService]
    });
  });

  it('should be created', inject([ExceptionHandlerCoreService], (service: ExceptionHandlerCoreService) => {
    expect(service).toBeTruthy();
  }));
});
