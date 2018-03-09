import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [LoggerService]
})
export class LoggerModule {
  static for(options: { name: string }): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useFactory: () => {
            return new LoggerService().setOptions({
              name: options.name
            });
          }
        }
      ]
    };
  }
}
