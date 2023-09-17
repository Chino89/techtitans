import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { NewCourseComponent } from './new-course/new-course.component';

@NgModule({
  declarations: [CoursesPageComponent, NewCourseComponent],
  imports: [CommonModule, CoursesRoutingModule],
})
export class CoursesModule {}
