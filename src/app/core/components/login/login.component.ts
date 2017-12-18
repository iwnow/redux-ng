import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from '../../redux/models/state';
import { actionCreators } from '../../redux/ducks/login-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  get cEmail() { return this.loginForm.get('email'); }
  get cPassword() { return this.loginForm.get('password'); }


  constructor(
    private fb: FormBuilder,
    private store: NgRedux<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      stay: false
    });
    this.store
      .select(s => !!s.core.appUser)
      .subscribe(isUserAuthenticated => {
        isUserAuthenticated && this.router.navigate(['/']);
      });
  }

  onLogin() {
    // console.log(this.loginForm.value);
    this.store.dispatch(actionCreators.loginFormRequest({
      isLoginRequest: true,
      login: this.cEmail.value,
      password: this.cPassword.value
    }));
  }

}
