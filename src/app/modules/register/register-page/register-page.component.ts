import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  RegisterError,
  RegisterRequest,
} from 'src/app/core/interfaces/interfaces';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  greeting: string = 'Hola, Bienvenido!';
  registerError: RegisterError[] = [{ msg: '' }];
  registerForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    terms: [false, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      this.registerService
        .register(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            if (errorData.error.message) {
              this.registerError = [{ msg: errorData.error.message }];
            } else {
              this.registerError = errorData.error.errors as RegisterError[];
            }
          },
          complete: () => {
            console.info('Registro exitoso');
            window.alert('Bienvenido! No olvides validar tu email');
            this.router.navigateByUrl('');
          },
        });
    } else {
      console.log('Error al registrar nuevo usuario');
      this.registerForm.markAllAsTouched();
    }
  }

  get nombre() {
    return this.registerForm.controls.nombre;
  }
  get apellido() {
    return this.registerForm.controls.apellido;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get terms() {
    return this.registerForm.controls.terms;
  }
}
