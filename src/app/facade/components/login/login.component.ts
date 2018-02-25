import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFormState } from '../../store/model';
import { Observable } from 'rxjs/Observable';
import { LoginFormStoreService } from '../../store';

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
    return this.loginFormService.state;
  }
  get isRequesting$() {
    return this.loginFormService.store.select(
      s => s.loginForm && s.loginForm.isLoginRequest
    );
  }

  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormStoreService
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

    if (this.state.isLoginRequest) return;

    this.loginFormService.store.dispatch(
      this.loginFormService.loginRequest({
        login: this.emailControl.value,
        password: this.passwordControl.value
      })
    );
  }
}
