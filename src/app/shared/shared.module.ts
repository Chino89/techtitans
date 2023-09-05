import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NglrxPipesModule } from '@nglrx/pipes';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCoursesComponent } from './components/new-courses/new-courses.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';

const myModules = [
  HeaderComponent,
  FooterComponent,
  CourseCardComponent,
  NewCoursesComponent,
  UserCoursesComponent,
];

@NgModule({
  declarations: myModules,
  imports: [CommonModule, RouterModule, NglrxPipesModule],
  exports: myModules,
  providers: [],
})
export class SharedModule {}
