import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  TeacherData,
  TeacherDataResponse,
} from 'src/app/core/interfaces/userInterfaces';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-teaching-staff',
  templateUrl: './teaching-staff.component.html',
  styleUrls: ['./teaching-staff.component.css'],
})
export class TeachingStaffComponent implements OnInit, OnDestroy {
  teacherStaff: TeacherData[] = [];
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const getTeachersServiceSubscription = this.userService
      .getTeachers()
      .subscribe({
        next: (response: TeacherDataResponse) =>
          {(this.teacherStaff = response.data)},
        error: (errorData) => console.log(errorData),
      });
    this.subscriptions.push(getTeachersServiceSubscription);

    
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
