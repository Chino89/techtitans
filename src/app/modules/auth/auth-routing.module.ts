import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { RecoveryPasswordPageComponent } from './recovery-password-page/recovery-password-page.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';

import { ExitGuard } from 'src/app/core/guards/exit.guard';

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
    canDeactivate: [ExitGuard],
    component: RegisterPageComponent,
    children: [],
  },
  {
    path: 'olvide-clave',
    pathMatch: 'full',
    component: ForgotPasswordPageComponent,
    children: [],
  },
  {
    path: 'recuperar-clave/:token',
    pathMatch: 'full',
    component: RecoveryPasswordPageComponent,
    children: [],
  },
  {
    path: 'verificar/:token',
    pathMatch: 'full',
    component: VerifyUserComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
