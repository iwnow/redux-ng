import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CurrentAppUserService } from '../services';

@Injectable()
export class FacadeAuthenticationGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.currentAppUser.isAuthenticated.pipe(
      map(isAuth => {
        !isAuth && this.router.navigateByUrl('/login');
        return isAuth;
      })
    );
  }

  constructor(
    protected currentAppUser: CurrentAppUserService,
    protected router: Router
  ) {}
}
