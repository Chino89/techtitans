import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { ExitGuard } from 'src/app/core/guards/exit.guard';



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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
