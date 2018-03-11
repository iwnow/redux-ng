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
import { BulmaModalDialogService, ModalType } from '@vh/core/modal';
import { ModuleRegistrationCoreService } from '@vh/core';
import env from '@vh/core/env';

@Component({
  selector: 'vh-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacadeComponent implements OnInit {
  @ViewChild('infoTmpl') infoTmpl: TemplateRef<any>;

  appUserName$;
  version = env.version;

  get modulesInfo() {
    return this.moduleRegService.modules;
  }

  constructor(
    protected appUser: AppUserDuckService,
    protected facade: FacadeStoreService,
    protected router: Router,
    protected modalService: BulmaModalDialogService,
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
