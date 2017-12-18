import { TestBed, inject } from '@angular/core/testing';

import { ReduxEpicService } from './redux-epic.service';

describe('ReduxEpicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxEpicService]
    });
  });

  it('should be created', inject([ReduxEpicService], (service: ReduxEpicService) => {
    expect(service).toBeTruthy();
  }));
});
