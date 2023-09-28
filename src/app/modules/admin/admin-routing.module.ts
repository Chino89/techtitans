import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { DeleteCategoryComponent } from './Components/delete-category/delete-category.component';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: 'crear-categoria',
    canActivate: [AdminGuard],
    component: CreateCategoryComponent,
    children: [],
  },
  {
    path: 'editar-categoria',
    canActivate: [AdminGuard],
    component: EditCategoryComponent,
    children: [],
  },
  {
    path: 'eliminar-categoria',
    canActivate: [AdminGuard],
    component: DeleteCategoryComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
