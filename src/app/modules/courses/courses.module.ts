import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { FindCourseComponent } from './find-course/find-course.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    NewCourseComponent,
    CourseDetailComponent,
    DeleteCourseComponent,
    EditCourseComponent,
    FindCourseComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule,
    SharedModule,
  ],
})
export class CoursesModule {}
