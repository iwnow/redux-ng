import { Injectable } from '@angular/core';
import { FacadeStoreService } from './facade-store.service';

@Injectable()
export class CurrentAppUserService {
  constructor(protected fss: FacadeStoreService) {}

  get isAuthenticated() {
    return this.fss.store.select(s => !!(s && s.appUser));
  }
}
