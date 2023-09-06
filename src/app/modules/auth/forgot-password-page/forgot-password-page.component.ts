import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ForgotPasswordService } from 'src/app/core/services/auth/forgot-password.service';
import {
  ForgotPasswordRequest,
  backEndError,
} from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent implements OnInit {
  greeting: string = 'Recuperemos tu clave';
  recoveryError: backEndError[] = [];
  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private forgotService: ForgotPasswordService
  ) {}

  ngOnInit(): void {}

  setPassword() {
    if (this.recoveryForm.valid) {
      this.forgotService
        .recovery(this.recoveryForm.value as ForgotPasswordRequest)
        .subscribe({
          error: (errorData) => {
            console.log('estoy en el error', errorData);
            if (errorData.error.mensaje) {
              this.recoveryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.recoveryError = errorData.error.errors as backEndError[];
            }
          },
          complete: () => {
            console.info('Mail enviado');
            window.alert('Se ha enviado un e-mail a tu casilla.');
            this.router.navigateByUrl('');
          },
        });
    } else {
      console.log('Error al recuperar contraseña');
      this.recoveryForm.markAllAsTouched();
    }
  }

  get email() {
    return this.recoveryForm.controls.email;
  }
}