import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';

@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ForgotPasswordModule {}
