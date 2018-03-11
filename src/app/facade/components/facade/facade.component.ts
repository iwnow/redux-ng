import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { AppUserDuckService } from '../../store';
import { Router } from '@angular/router';
import { FacadeStoreService } from '@vh/facade/services';
import { InfoModalDialogService } from '@vh/core/modal/services';
import { ModuleRegistrationCoreService } from '@vh/core';

@Component({
  selector: 'vh-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacadeComponent implements OnInit {
  @ViewChild('infoTmpl') infoTmpl: TemplateRef<any>;

  appUserName$;

  get modulesInfo() {
    return this.moduleRegService.modules;
  }

  constructor(
    protected appUser: AppUserDuckService,
    protected facade: FacadeStoreService,
    protected router: Router,
    protected modalService: InfoModalDialogService,
    protected moduleRegService: ModuleRegistrationCoreService
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

  helpClick(helpBtn) {
    this.modalService.open({
      templateRef: this.infoTmpl
    });
  }
}
