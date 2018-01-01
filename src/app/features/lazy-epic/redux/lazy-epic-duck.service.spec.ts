import { TestBed, inject } from '@angular/core/testing';

import { LazyEpicDuckService } from './lazy-epic-duck.service';

describe('LazyEpicDuckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyEpicDuckService]
    });
  });

  it('should be created', inject([LazyEpicDuckService], (service: LazyEpicDuckService) => {
    expect(service).toBeTruthy();
  }));
});
