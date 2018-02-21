import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeComponent } from './components/facade/facade.component';
import { LoginComponent } from './components/login/login.component';
import { FacadeAuthenticationGuard } from './guards/facade-authentication.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FacadeComponent,
    LoginComponent
  ],
  exports: [
    FacadeComponent,
    LoginComponent
  ],
  providers: [FacadeAuthenticationGuard]
})
export class FacadeModule { }
