import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NglrxPipesModule } from '@nglrx/pipes';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCoursesComponent } from './components/new-courses/new-courses.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SetOfButtonsComponent } from './components/set-of-buttons/set-of-buttons.component';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { TimeCustomizerPipe } from './pipes/timeCustomizerPipe/time-customizer.pipe';
import { RoleCustomizerPipe } from './pipes/roleCustomizerPipe/role-customizer.pipe';

const myModules = [
  TimeCustomizerPipe,
  RoleCustomizerPipe,
  HeaderComponent,
  FooterComponent,
  CourseCardComponent,
  NewCoursesComponent,
  UserCoursesComponent,
  DropdownComponent,
  SetOfButtonsComponent,
  CustomToastComponent,
  UserDropdownComponent,
];

@NgModule({
  declarations: myModules,
  imports: [CommonModule, RouterModule, NglrxPipesModule, AngularSvgIconModule],
  exports: myModules,
  providers: [],
})
export class SharedModule {}
