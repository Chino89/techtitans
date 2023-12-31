import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { DeleteCategoryComponent } from './Components/delete-category/delete-category.component';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';
import { RoleManagementComponent } from './Components/role-management/role-management.component';

@NgModule({
  declarations: [
    CreateCategoryComponent,
    DeleteCategoryComponent,
    EditCategoryComponent,
    RoleManagementComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule,
    SharedModule,
  ],
})
export class AdminModule {}
