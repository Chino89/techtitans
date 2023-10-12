import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { InscriptoDetailComponent } from './components/inscripto-detail/inscripto-detail.component';
import { DownloadCertificateComponent } from './components/download-certificate/download-certificate.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: 'perfil',
        component: UserProfileComponent,
        children: [],
      },
      {
        path: 'mis-cursos',
        component: UserCoursesComponent,
        children: [],
      },
      {
        path: 'mis-cursos/dictados/:identificator',
        component: InscriptoDetailComponent,
        children: [],
      },
      {
        path: 'mis-cursos/inscripcion/:identificator',
        component: DownloadCertificateComponent,
        children: [],
      },
      {
        path: 'edicion',
        component: UserEditComponent,
        children: [],
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
