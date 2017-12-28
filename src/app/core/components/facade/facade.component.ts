import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { IAppState } from '../../redux/models/state';
import { AppUserDuckCoreService } from '../../redux/services/app-user-duck-core.service';

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
    private router: Router,
    private appUserDuck: AppUserDuckCoreService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.store.dispatch(this.appUserDuck.createActionAppUserLogout());
    this.router.navigate(['/login']);
  }

}
