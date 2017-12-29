import { TestBed, inject } from '@angular/core/testing';

import { AppSettingsCoreService } from './app-settings-core.service';

describe('AppSettingsCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingsCoreService]
    });
  });

  it('should be created', inject([AppSettingsCoreService], (service: AppSettingsCoreService) => {
    expect(service).toBeTruthy();
  }));
});
