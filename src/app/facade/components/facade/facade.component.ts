import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppUserDuckService } from '../../store';
import { FacadeModuleService } from '../../facade.service';

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
    protected facade: FacadeModuleService
  ) {}

  ngOnInit() {
    this.appUserName$ = this.facade.store.select(
      s => s && s.appUser && s.appUser.name
    );
  }

  logoutUser() {
    this.facade.store.dispatch(this.appUser.appUserLogout());
  }

  // setTheme(theme) {
  //   this.facade.store.dispatch(this.appUserDuck.createActionAppUserSetTheme(theme));
  // }
}