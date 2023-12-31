import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/core/services/auth/login.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { LoginRequest } from 'src/app/core/interfaces/authInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  greeting = 'Hola! Qué bueno verte otra vez';
  errorGreeting = 'Oops! Tuvimos algunos errores...';
  loginError: BackEndError[] = [];
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  subscriptions: Subscription[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  login() {
    if (this.loginForm.valid) {
      const loginServiceSubscription = this.loginService
        .login(this.loginForm.value as LoginRequest)
        .subscribe({
          error: (errorData) => {
            if (errorData.error.mensaje) {
              this.loginError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.loginError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.router.navigateByUrl('');
          },
        });
      this.subscriptions.push(loginServiceSubscription);
    } else {
      console.log('error al inicio de sesión');
      this.loginForm.markAllAsTouched();
    }
  }

  logOut() {
    this.loginService.logOut();
  }

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
