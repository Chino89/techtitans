import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NglrxPipesModule } from '@nglrx/pipes';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCoursesComponent } from './components/new-courses/new-courses.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, CourseCardComponent, NewCoursesComponent, UserCoursesComponent],
  imports: [
    CommonModule,
    NglrxPipesModule
  ],
  exports: [
    HeaderComponent, FooterComponent, CourseCardComponent, NewCoursesComponent, UserCoursesComponent
  ],
})
export class SharedModule { }
