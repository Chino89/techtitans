import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPasswordPageComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
