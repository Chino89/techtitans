import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExitGuard } from 'src/app/core/guards/exit.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
    children: [],
  },
  {
    path: 'crear-curso',
    canActivate: [AdminGuard],
    canDeactivate: [ExitGuard],
    component: NewCourseComponent,
    children: [],
  },
  {
    path: ':identificator',
    component: CourseDetailComponent,
    children: [],
  },
  {
    path: ':identificator/borrar-curso',
    canActivate: [AdminGuard],
    component: DeleteCourseComponent,
    children: [],
  },
  {
    path: ':identificator/editar-curso',
    canActivate: [AdminGuard],
    component: EditCourseComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
