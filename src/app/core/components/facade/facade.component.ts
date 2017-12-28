import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { IAppState } from '../../redux/models/state';
import { actionCreators } from '../../redux/ducks/app-user';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.store.dispatch(actionCreators.appUserLogout());
    this.router.navigate(['/login']);
  }

}
