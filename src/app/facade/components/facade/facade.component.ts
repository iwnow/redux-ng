import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppUserDuckService } from '../../store';
import { Router } from '@angular/router';
import { FacadeStoreService } from '@vh/facade/services';

@Component({
  selector: 'vh-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacadeComponent implements OnInit {
  appUserName$;

  constructor(
    protected appUser: AppUserDuckService,
    protected facade: FacadeStoreService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.appUserName$ = this.facade.store.select(
      s => s && s.appUser && s.appUser.name
    );
  }

  logoutUser() {
    this.facade.store.dispatch(this.appUser.appUserLogout());
  }

  companyLogoClick() {
    this.router.navigateByUrl('/');
  }

  setTheme(theme) {}
}
