import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCoursesComponent } from './components/new-courses/new-courses.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, CourseCardComponent, NewCoursesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, FooterComponent, CourseCardComponent, NewCoursesComponent
  ],
})
export class SharedModule { }
