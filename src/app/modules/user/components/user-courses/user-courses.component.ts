import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CourseData,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import {
  UserEnrollment,
  UserEnrollmentData,
} from 'src/app/core/interfaces/enrollmentInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css'],
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  user: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };
  userDetail: UserResponse = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    avatar: '',
    public_id: null,
    status: false,
  };
  subscriptions: Subscription[] = [];
  userCoursesResponse: UserEnrollmentData[] = [];
  teacherCoursesResponse: CourseResponse[] = [];
  backendErrors: BackEndError[] = [];
  userIsLoged = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe((data) => {
        this.user = data;
        this.getUserDetail();
        this.getUserCourses();
      });
    this.subscriptions.push(currentUserDataServiceSubscription);

    const currentUserLoginOnServiceSubscription =
      this.loginService.currentUserLoginOn.subscribe({
        next: (userIsLoged) => {
          this.userIsLoged = userIsLoged;
        },
      });
    this.subscriptions.push(currentUserLoginOnServiceSubscription);

    const getAllTeacherCoursesServiceSubscription = this.courseService
      .getAllTeacherCourses()
      .subscribe({
        next: (response: CourseData) => {
          (this.teacherCoursesResponse = response.data),
            console.log(this.teacherCoursesResponse);
        },
        error: (errorData) => {
          if (errorData.error.mensaje) {
            this.backendErrors = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.backendErrors = errorData.error.errors as BackEndError[];
          }
        },
      });
    this.subscriptions.push(getAllTeacherCoursesServiceSubscription);
  }

  getUserDetail() {
    const getUserDataServiceSubscription = this.userService
      .getUserData()
      .subscribe({
        next: (response) => {
          this.userDetail = response.data;
        },
      });
    this.subscriptions.push(getUserDataServiceSubscription);
  }

  getUserCourses() {
    const getMyCoursesServiceSubscription = this.enrollmentService
      .getMyCourses()
      .subscribe({
        next: (response: UserEnrollment) => {
          console.log(response);
          this.userCoursesResponse = response.data;
        },
      });
    this.subscriptions.push(getMyCoursesServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
