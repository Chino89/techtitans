import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserDropdownComponent,
    UserCoursesComponent,
    UserEditComponent,
    UserProfileComponent,
  ],

  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
  exports: [UserDropdownComponent],
})
export class UserModule {}
