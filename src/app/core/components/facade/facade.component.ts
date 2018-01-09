import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { IAppState } from '../../redux/models/state';
import { AppUserDuckCoreService } from '../../redux/services/app-user-duck-core.service';
import { AppSettingsCoreService } from '../../services/app-settings-core.service';

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacadeComponent implements OnInit {
  @select(['core', 'appUser', 'name'])
  appUserName$: Observable<string>;

  constructor(
    private store: NgRedux<IAppState>,
    public router: Router,
    private appUserDuck: AppUserDuckCoreService,
    private appSettings: AppSettingsCoreService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.store.dispatch(this.appUserDuck.createActionAppUserLogout());
  }

  defaultTheme() {
    this.store.dispatch(this.appUserDuck.createActionAppUserSetTheme(this.appSettings.themes.default));
  }

  darkTheme() {
    this.store.dispatch(this.appUserDuck.createActionAppUserSetTheme(this.appSettings.themes.dark));
  }

}
