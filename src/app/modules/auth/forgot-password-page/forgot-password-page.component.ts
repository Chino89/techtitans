import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ForgotPasswordService } from 'src/app/core/services/auth/forgot-password.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { ForgotPasswordRequest } from 'src/app/core/interfaces/authInterfaces';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
  greeting = 'Recuperemos tu clave';
  errorGreeting = 'Oops! Tuvimos algunos errores...';
  emailToast = false;
  communication = 'Te hemos enviado un email, Chequea tu casilla por favor.';
  recoveryError: BackEndError[] = [];
  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private forgotService: ForgotPasswordService
  ) {}

  ngOnInit(): void {}

  setPassword() {
    if (this.recoveryForm.valid) {
      const recoveryForgotServiceSubscription = this.forgotService
        .recovery(this.recoveryForm.value as ForgotPasswordRequest)
        .subscribe({
          error: (errorData) => {
            if (errorData.error.mensaje) {
              this.recoveryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.recoveryError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.emailToast = true;
            setTimeout(() => {
              this.router.navigateByUrl('');
            }, 5000);
          },
        });
      this.subscriptions.push(recoveryForgotServiceSubscription);
    } else {
      this.recoveryForm.markAllAsTouched();
    }
  }

  get email() {
    return this.recoveryForm.controls.email;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
