import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFormState } from '../../store/model';
import { Observable } from 'rxjs/Observable';
import { LoginFormDuckService } from '../../store';
import { FacadeModuleService } from '../../facade.service';

@Component({
  selector: 'vh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  get emailControl() {
    return this.loginForm.controls.email;
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  get state() {
    const state = this.facade.state;
    return state && state.loginForm;
  }
  get isRequesting$() {
    return this.facade.store.select(
      s => s && s.loginForm && s.loginForm.isLoginRequest
    );
  }
  get loginError() {
    return this.facade.store.select(
      s => s && s.loginForm && s.loginForm.loginError
    );
  }

  constructor(
    private fb: FormBuilder,
    private loginFormDuck: LoginFormDuckService,
    private facade: FacadeModuleService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      stay: false
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;

    if (this.state && this.state.isLoginRequest) return;

    this.facade.store.dispatch(
      this.loginFormDuck.loginRequest({
        login: this.emailControl.value,
        password: this.passwordControl.value
      })
    );
  }
}
