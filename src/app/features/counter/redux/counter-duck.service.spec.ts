import { TestBed, inject } from '@angular/core/testing';

import { CounterDuckService } from './counter-duck.service';

describe('CounterDuckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterDuckService]
    });
  });

  it('should be created', inject([CounterDuckService], (service: CounterDuckService) => {
    expect(service).toBeTruthy();
  }));
});
