import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RegisterPageComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
