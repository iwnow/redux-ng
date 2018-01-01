import { TestBed, inject } from '@angular/core/testing';

import { NgFormsDuckService } from './ng-forms-duck.service';

describe('NgFormsDuckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgFormsDuckService]
    });
  });

  it('should be created', inject([NgFormsDuckService], (service: NgFormsDuckService) => {
    expect(service).toBeTruthy();
  }));
});
