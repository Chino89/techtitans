import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordRecoveryService } from 'src/app/core/services/auth/password-recovery.service';
import {
  SetPasswordRequest,
  BackEndError,
} from 'src/app/core/interfaces/interfaces';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.css'],
})
export class RecoveryPasswordPageComponent implements OnInit {
  greeting= 'Elige tu contraseña';
  errorGreeting = 'Oops! Tuvimos algunos errores...';
  passwordToast = false;
  recoveryError: BackEndError[] = [];
  token = '';
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
      this.passwordRecoveryService
        .setPassword(this.setForm.value as SetPasswordRequest, this.token)
        .subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            if (errorData.error.mensaje) {
              this.recoveryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.recoveryError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            console.info('Password seteado con éxito');
            this.passwordToast = true;
            setTimeout(() => {
              this.router.navigateByUrl('/iniciar-sesion');
            }, 3000);
          },
        });
    }
  }

  get password() {
    return this.setForm.controls['password'];
  }
  get confirm_password() {
    return this.setForm.controls['confirm_password'];
  }
}
