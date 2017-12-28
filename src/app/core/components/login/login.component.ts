import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../redux/models/state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginFormDuckCoreService } from '../../redux/services/login-form-duck-core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  get cEmail() { return this.loginForm.get('email'); }
  get cPassword() { return this.loginForm.get('password'); }

  @select(s => s.core.loginForm.isLoginRequest)
  isRequesting$: Observable<boolean>;


  constructor(
    private fb: FormBuilder,
    private store: NgRedux<IAppState>,
    private router: Router,
    private loginFormDuckService: LoginFormDuckCoreService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      stay: false
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;

    if (this.store.getState().core.loginForm.isLoginRequest) return;

    this.store.dispatch(this.loginFormDuckService.createActionLoginFormRequest({
      isLoginRequest: true,
      login: this.cEmail.value,
      password: this.cPassword.value
    }));
  }

}
