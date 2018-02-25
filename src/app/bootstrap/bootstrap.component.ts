import {
  Component,
  Renderer2,
  OnInit,
  ElementRef,
  OnDestroy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'vh-application-root',
  templateUrl: './bootstrap.component.html'
})
export class BootstrapComponent implements OnInit, OnDestroy {
  subs: any[] = [];

  @HostBinding('class') currentTheme: string;

  // private appSetting: AppSettingsCoreService
  constructor() {}

  ngOnInit() {
    // const sub = this.appSetting.selectAppTheme()
    //   .subscribe(themeClass => {
    //     this.currentTheme = themeClass || this.appSetting.themes.default;
    //   });
    // this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
