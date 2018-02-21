import { Component, Renderer2, OnInit, ElementRef, OnDestroy, HostBinding } from '@angular/core';
import { AppSettingsCoreService } from '../core';

@Component({
  selector: 'vh-application-root',
  templateUrl: './bootstrap.component.html'
})
export class BootstrapComponent implements OnInit, OnDestroy {
  subs: any[] = [];

  @HostBinding('class')
  currentTheme: string;

  constructor(
    private appSetting: AppSettingsCoreService
  ) { }

  ngOnInit() {
    const sub = this.appSetting.selectAppTheme()
      .subscribe(themeClass => {
        this.currentTheme = themeClass || this.appSetting.themes.default;
      });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
