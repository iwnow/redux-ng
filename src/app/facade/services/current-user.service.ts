import { Injectable } from '@angular/core';
import { FacadeModuleService } from '../facade.service';

@Injectable()
export class CurrentAppUserService {
  constructor(protected facade: FacadeModuleService) {}

  get isAuthenticated() {
    return this.facade.store.select(s => !!(s && s.appUser));
  }
}
