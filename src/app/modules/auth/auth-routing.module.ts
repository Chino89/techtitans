import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { RecoveryPasswordPageComponent } from './recovery-password-page/recovery-password-page.component';

import { RecoveryGuard } from 'src/app/core/guards/recovery.guard';
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
    // canActivate: [RecoveryGuard],
    component: RecoveryPasswordPageComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
