import { TestBed, inject } from '@angular/core/testing';

import { NgFormsStoreService } from './ng-forms-store.service';

describe('NgFormsStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgFormsStoreService]
    });
  });

  it('should be created', inject([NgFormsStoreService], (service: NgFormsStoreService) => {
    expect(service).toBeTruthy();
  }));
});
