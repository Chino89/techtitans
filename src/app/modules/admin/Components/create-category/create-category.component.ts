import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryName } from 'src/app/core/interfaces/categoryInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  newCategoryToast = false;
  toastKey = '';
  message = 'Creando una nueva categoría';
  errorMessage = 'Oops, hubieron algunos errores';
  newCategoryError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  newCategoryForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  onCreateCategory() {
    if (this.newCategoryForm.valid) {
      const recoveryForgotServiceSubscription = this.categoryService
        .createCategory(this.newCategoryForm.value as CategoryName)
        .subscribe({
          error: (errorData) => {
            this.newCategoryToast = true;
            this.toastKey = 'error';
            if (errorData.error.mensaje) {
              this.newCategoryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.newCategoryError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.newCategoryToast = true;
            this.toastKey = 'check';
            setTimeout(() => {
              this.router.navigateByUrl('');
            }, 3000);
          },
        });
      this.subscriptions.push(recoveryForgotServiceSubscription);
    } else {
      this.newCategoryForm.markAllAsTouched();
    }
  }

  get nombre() {
    return this.newCategoryForm.controls.nombre;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
