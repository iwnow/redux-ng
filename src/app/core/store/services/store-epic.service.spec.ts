import { TestBed, inject } from '@angular/core/testing';

import { StoreEpicService } from './store-epic.service';

describe('StoreEpicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreEpicService]
    });
  });

  it('should be created', inject([StoreEpicService], (service: StoreEpicService) => {
    expect(service).toBeTruthy();
  }));
});
