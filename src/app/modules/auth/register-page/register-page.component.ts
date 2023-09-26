import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import {
  BackEndError,
  onExit,
  RegisterRequest,
} from 'src/app/core/interfaces/interfaces';
import { RegisterService } from 'src/app/core/services/auth/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit, onExit {
  greeting: string = 'Hola, Bienvenido!';
  errorGreeting: string = 'Oops! Tuvimos algunos errores...';
  registerToast: boolean = false;
  registerError: BackEndError[] = [];
  hasUser: boolean = false;
  nextRoute: string = '';
  forceExit: boolean = false;
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
            if (errorData.error.mensaje) {
              this.registerError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.registerError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            console.info('Registro exitoso');
            this.registerToast = true;
            this.hasUser = true;
            setTimeout(() => {
              this.router.navigateByUrl('/iniciar-sesion');
            }, 3000);
          },
        });
    } else {
      console.log('Error al registrar nuevo usuario');
      this.registerForm.markAllAsTouched();
    }
  }

  closeToast() {
    this.registerToast = false;
  }

  onExit(nextRoute: RouterStateSnapshot | undefined) {
    if (this.forceExit) {
      return true;
    }
    if (this.registerForm.dirty && !this.hasUser) {
      this.registerToast = true;
      this.nextRoute = nextRoute!.url;
      return false;
    }
    return true;
  }

  navigate() {
    this.forceExit = true;
    this.router.navigateByUrl(this.nextRoute);
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
