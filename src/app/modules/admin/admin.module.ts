import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { DeleteCategoryComponent } from './Components/delete-category/delete-category.component';


@NgModule({
  declarations: [
    CreateCategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
