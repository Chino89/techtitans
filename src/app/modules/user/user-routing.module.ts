import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

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
