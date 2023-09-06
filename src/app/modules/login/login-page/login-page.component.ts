import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/core/services/auth/login.service';
import { LoginRequest, backEndError } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  hide: boolean = true;
  greeting: string = 'Hola! Qué bueno verte otra vez';
  loginError: backEndError[] = [];
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          if (errorData.error.mensaje) {
            this.loginError = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.loginError = errorData.error.errors as backEndError[];
          }
        },
        complete: () => {
          console.info('Login completo');
          this.router.navigateByUrl('');
        },
      });
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
}
