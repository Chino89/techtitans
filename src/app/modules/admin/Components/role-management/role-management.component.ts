import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import {
  UserDataResponse,
  UserResponse,
} from 'src/app/core/interfaces/userInterfaces';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  roleToast = false;
  toastKey = '';
  message = 'Gestión de roles de usuario';
  errorMessage = 'Oops, hubieron algunos errores';
  rolesError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  users: UserResponse[] = [];
  roleManagementForm = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    rolRadio: ['', [Validators.required]],
  });
  roleList: string[] = ['Admin', 'Docente', 'Estudiante'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: UserDataResponse) => (this.users = data.data),
      error: (errorData) => console.log(errorData),
    });
  }

  onPatchRole() {
    const id = Number(this.roleManagementForm.value.usuario);
    const roles = [this.roleManagementForm.value.rolRadio];

    if (this.roleManagementForm.valid) {
      const recoveryForgotServiceSubscription = this.userService
        .patchRole(id as number, roles as string[])
        .subscribe({
          error: (errorData) => {
            this.roleToast = true;
            this.toastKey = 'error';
            if (errorData.error.mensaje) {
              this.rolesError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.rolesError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.roleToast = true;
            this.toastKey = 'check';
            setTimeout(() => {
              this.router.navigateByUrl('');
            }, 3000);
          },
        });
      this.subscriptions.push(recoveryForgotServiceSubscription);
    } else {
      this.roleManagementForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  get user() {
    return this.roleManagementForm.controls.usuario;
  }

  get rolRadio() {
    return this.roleManagementForm.controls.rolRadio;
  }
}
