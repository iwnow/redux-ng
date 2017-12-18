import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/models/state';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  readonly loginUrl: string = '/login';

  constructor(
    private store: NgRedux<IAppState>,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store
      .select(s => !!s.core.appUser)
      .map(isUserDefined => {
        !isUserDefined && this.router.navigate([this.loginUrl]);
        return isUserDefined;
      });
  }
}
