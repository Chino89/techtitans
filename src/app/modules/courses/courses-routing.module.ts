import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { NewCourseComponent } from './new-course/new-course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
    children: []
  },
  {
    path: 'crear-curso',
    component: NewCourseComponent,
    children: []
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
