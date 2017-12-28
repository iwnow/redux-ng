import { TestBed, inject } from '@angular/core/testing';

import { LoggerCoreService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerCoreService]
    });
  });

  it('should be created', inject([LoggerCoreService], (service: LoggerCoreService) => {
    expect(service).toBeTruthy();
  }));
});
