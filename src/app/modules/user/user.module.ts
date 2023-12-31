import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherControlComponent } from './components/teacher-control/teacher-control.component';
import { InscriptoDetailComponent } from './components/inscripto-detail/inscripto-detail.component';
import { DownloadCertificateComponent } from './components/download-certificate/download-certificate.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserCoursesComponent,
    UserEditComponent,
    UserProfileComponent,
    TeacherControlComponent,
    InscriptoDetailComponent,
    DownloadCertificateComponent,
  ],

  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [],
})
export class UserModule {}
