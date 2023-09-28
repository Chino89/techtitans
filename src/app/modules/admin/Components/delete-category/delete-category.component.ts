import { Component, OnInit } from '@angular/core';
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
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent implements OnInit {
  deleteCategoryToast = false;
  toastKey = '';
  message = 'Borrar categoría';
  errorMessage = 'Oops, hubieron algunos errores';
  newCategoryError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  categories: CategoryData[] = [];
  deleteCategoryForm = this.formBuilder.group({
    categoriaId: ['', [Validators.required]],
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

  onDeleteCategory() {
    const id = Number(this.deleteCategoryForm.value.categoriaId);
    if (this.deleteCategoryForm.valid) {
      const recoveryForgotServiceSubscription = this.categoryService
        .deleteCategory(id)
        .subscribe({
          error: (errorData) => {
            this.deleteCategoryToast = true;
            this.toastKey = 'error';
            if (errorData.error.mensaje) {
              this.newCategoryError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.newCategoryError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            this.deleteCategoryToast = true;
            this.toastKey = 'check';
            setTimeout(() => {
              this.router.navigateByUrl('');
            }, 5000);
          },
        });
      this.subscriptions.push(recoveryForgotServiceSubscription);
    } else {
      this.deleteCategoryForm.markAllAsTouched();
    }
  }

  get categoriaId() {
    return this.deleteCategoryForm.controls.categoriaId;
  }
}
