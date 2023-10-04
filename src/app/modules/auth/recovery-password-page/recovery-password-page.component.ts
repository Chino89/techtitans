import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordRecoveryService } from 'src/app/core/services/auth/password-recovery.service';
import { SetPasswordRequest } from 'src/app/core/interfaces/authInterfaces';
import { MyValidators } from 'src/app/utils/validators';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.css'],
})
export class RecoveryPasswordPageComponent implements OnInit, OnDestroy {
  greeting = 'Elige tu contraseña';
  errorGreeting = 'Oops! Tuvimos algunos errores...';
  passwordToast = false;
  toastKey = '';
  recoveryError: BackEndError[] = [];
  token = '';
  subscriptions: Subscription[] = [];
  setForm = this.formBuilder.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirm_password: ['', Validators.required],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordRecoveryService: PasswordRecoveryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') as string;
  }

  renewPassword() {
    if (this.setForm.valid) {
      const setPasswordRecoveryServiceSubscription =
        this.passwordRecoveryService
          .setPassword(this.setForm.value as SetPasswordRequest, this.token)
          .subscribe({
            next: (userData) => {
              console.log(userData);
            },
            error: (errorData) => {
              this.passwordToast = true;
              this.toastKey = 'error';
              if (errorData.error.mensaje) {
                this.recoveryError = [{ mensaje: errorData.error.mensaje }];
              } else {
                this.recoveryError = errorData.error.errors as BackEndError[];
              }
            },
            complete: () => {
              console.info('Password seteado con éxito');
              this.passwordToast = true;
              this.toastKey = 'check';
              setTimeout(() => {
                this.router.navigateByUrl('/iniciar-sesion');
              }, 3000);
            },
          });
      this.subscriptions.push(setPasswordRecoveryServiceSubscription);
    }
  }

  get password() {
    return this.setForm.controls['password'];
  }
  get confirm_password() {
    return this.setForm.controls['confirm_password'];
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
