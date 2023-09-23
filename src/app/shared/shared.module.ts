import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NglrxPipesModule } from '@nglrx/pipes';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCoursesComponent } from './components/new-courses/new-courses.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

const myModules = [
  HeaderComponent,
  FooterComponent,
  CourseCardComponent,
  NewCoursesComponent,
  UserCoursesComponent,
  DropdownComponent,
  DropdownItemComponent,
];

@NgModule({
  declarations: myModules,
  imports: [CommonModule, RouterModule, NglrxPipesModule, AngularSvgIconModule ],
  exports: myModules,
  providers: [],
})
export class SharedModule {}
