import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    pathMatch: 'full',
    component: LoginPageComponent,
    children: [],
  },
  {
    path: 'registrarme',
    pathMatch: 'full',
    component: RegisterPageComponent,
    children: [],
  },
  {
    path: 'olvide-clave',
    pathMatch: 'full',
    component: ForgotPasswordPageComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
