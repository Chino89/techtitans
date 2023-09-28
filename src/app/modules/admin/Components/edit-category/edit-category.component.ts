import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  CategoryData,
  CategoryDataResponse,
} from 'src/app/core/interfaces/categoryInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  editCategoryToast = false;
  toastKey = '';
  message = 'Editar categoría';
  errorMessage = 'Oops, hubieron algunos errores';
  editCategoryError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  categories: CategoryData[] = [];
  editCategoryForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    nuevoNombre: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoryDataResponse) => (this.categories = data.data),
      error: (errorData) => console.log(errorData),
    });
  }

  onEditCategory() {
    const id = Number(this.editCategoryForm.value.nombre);
    const newName = this.editCategoryForm.value.nuevoNombre;
    if (this.editCategoryForm.valid) {
      const recoveryForgotServiceSubscription = this.categoryService
        .editCategory(id, newName as string)
        .subscribe({
          error: (errorData) => {
            this.editCategoryToast = true;
            this.toastKey = 'error';
            if (errorData.error.mensaje) {
              this.editCategoryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.editCategoryError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.editCategoryToast = true;
            this.toastKey = 'check';
            setTimeout(() => {
              this.router.navigateByUrl('');
            }, 3000);
          },
        });
      this.subscriptions.push(recoveryForgotServiceSubscription);
    } else {
      this.editCategoryForm.markAllAsTouched();
    }
  }

  get oldName() {
    return this.editCategoryForm.controls.nombre;
  }

  get newName() {
    return this.editCategoryForm.controls.nuevoNombre;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
