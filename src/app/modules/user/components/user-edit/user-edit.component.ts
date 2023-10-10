import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import {
  User,
  UserEditRequest,
  UserResponse,
} from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };
  oldUserDetail: UserResponse = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    avatar: '',
    public_id: null,
    status: false,
  };
  userEditErrors: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  userEditToast = false;
  file: Blob | null = null;
  selectedPhoto: ArrayBuffer | string = '';
  invalidType = false;
  fileInputTouched = false;
  spinner = false;
  userEdited = false;
  editUserForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      hasImage: [true, [Validators.requiredTrue]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      confirm_password: [''],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );
  hasChange = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUserDataSubscription =
      this.loginService.currentUserData.subscribe((data) => {
        this.user = data;
        this.getUserDetail(this.user.id);
      });
    this.subscriptions.push(currentUserDataSubscription);
  }

  getUserDetail(userId: number) {
    const getUserDetailSubscription = this.userService.getUserData().subscribe({
      next: (response) => {
        this.oldUserDetail = response.data;
        this.editUserForm.controls.nombre.setValue(response.data.nombre);
        this.editUserForm.controls.apellido.setValue(response.data.apellido);
        this.editUserForm.controls.email.setValue(response.data.email);
        this.selectedPhoto = response.data.avatar;
      },
    });
    this.subscriptions.push(getUserDetailSubscription);
  }

  selectPhoto(event: any): void {
    if (event.target.files && event.target.files[0]!) {
      this.file = <File>event.target.files[0];
      if (MyValidators.requiredFileType(this.file)) {
        const reader = new FileReader();
        reader.onload = (e) =>
          (this.selectedPhoto = reader.result as ArrayBuffer);
        reader.readAsDataURL(this.file);
        this.editUserForm.patchValue({ hasImage: true });
        this.editUserForm.updateValueAndValidity();
      } else {
        this.invalidType = true;
      }
    }
  }

  formHasChange(field: string) {
    const currentValue = (this.editUserForm.value as UserEditRequest)[field];
    const initialValue = this.oldUserDetail[field];
    this.hasChange = currentValue !== initialValue;
  }

  checkFormHasChanged() {
    return (
      this.editUserForm.invalid ||
      (this.editUserForm.valid && !this.hasChange && this.file === null)
    );
  }

  setFileInputTouched() {
    this.fileInputTouched = true;
  }

  onEditUser() {
    const param = this.oldUserDetail.id;
    this.spinner = true;
    const formData = new FormData();
    const { nombre, apellido, email, password, confirm_password } = this
      .editUserForm.value as UserEditRequest;

    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    this.file && formData.append('imageFile', this.file);

    if (this.editUserForm.valid) {
      const editUserSubscription = this.userService
        .editUser(param, formData)
        .subscribe({
          error: (errorData) => {
            this.spinner = false;
            this.userEditToast = true;
            if (errorData.error.mensaje) {
              this.userEditErrors = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.userEditErrors = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.userEditToast = true;
            this.userEdited = true;
            this.spinner = false;
            console.info('Usuario editado');
            setTimeout(() => {
              this.router.navigateByUrl('/usuario/perfil');
            }, 3000);
          },
        });
      this.subscriptions.push(editUserSubscription);
    }
  }

  get nombre() {
    return this.editUserForm.controls.nombre;
  }

  get apellido() {
    return this.editUserForm.controls.apellido;
  }

  get email() {
    return this.editUserForm.controls.email;
  }

  get hasImage() {
    return this.editUserForm.controls.hasImage;
  }

  get password() {
    return this.editUserForm.controls.password;
  }

  get confirm_password() {
    return this.editUserForm.controls.confirm_password;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
