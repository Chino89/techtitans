import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { RecoveryPasswordPageComponent } from './recovery-password-page/recovery-password-page.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    RecoveryPasswordPageComponent,
    VerifyUserComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class AuthModule {}
