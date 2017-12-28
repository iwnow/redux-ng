import { TestBed, inject } from '@angular/core/testing';

import { ReduxEpicCoreService } from './redux-epic-core.service';

describe('ReduxEpicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxEpicCoreService]
    });
  });

  it('should be created', inject([ReduxEpicCoreService], (service: ReduxEpicCoreService) => {
    expect(service).toBeTruthy();
  }));
});
