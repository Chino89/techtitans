import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PasswordRecoveryService } from 'src/app/core/services/auth/password-recovery.service';
import {
  SetPasswordRequest,
  backEndError,
} from 'src/app/core/interfaces/interfaces';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.css'],
})
export class RecoveryPasswordPageComponent implements OnInit {
  greeting: string = 'Elige tu contraseña';
  recoveryError: backEndError[] = [];
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
      confirmPassword: ['', Validators.required],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordRecoveryService: PasswordRecoveryService
  ) {}

  ngOnInit(): void {}

  renewPassword() {
    if (this.setForm.valid) {
      this.passwordRecoveryService
        .setPassword(this.setForm.value as SetPasswordRequest)
        .subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            if (errorData.error.mensaje) {
              this.recoveryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.recoveryError = errorData.error.errors as backEndError[];
            }
          },
          complete: () => {
            console.info('Password seteado con éxito');
            this.router.navigateByUrl('/iniciar-sesion');
          },
        });
    }
  }

  get password() {
    return this.setForm.controls['password'];
  }
  get confirmPassword() {
    return this.setForm.controls['confirmPassword'];
  }
}
