import { mensajeResponse } from './../../../../core/interfaces/paymentInterfaces';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
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
import { pagoDto } from 'src/app/core/interfaces/paymentInterfaces';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { modalTarget } from 'src/app/utils/modal';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css'],
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;
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
  courseLength = this.userCoursesResponse.length;
  pagoErrors: BackEndError[] = [];
  pagoToast: boolean = false;
  pagoMsj: string = '';

  pagoForm = this.formBuilder.group({
    tokenPago: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)],
    ],
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
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
          this.teacherCoursesResponse = response.data;
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
          this.userCoursesResponse = response.data;
        },
      });
    this.subscriptions.push(getMyCoursesServiceSubscription);
  }

  closeModal(): void {
    const modal = modalTarget('cobroModal');
    modal.hide();
  }

  openModal(): void {
    const modal = modalTarget('cobroModal');
    modal.show();
  }

  payCourse(): void {
    const { tokenPago } = this.pagoForm.value;
    let data: pagoDto = {
      pago: true,
    };

    if (this.pagoForm.valid) {
      this.paymentService.payCourse(tokenPago!.toUpperCase(), data).subscribe({
        next: (res: mensajeResponse) => {
          this.pagoMsj = res.mensaje;
        },
        error: (err) => {
          this.closeButton.nativeElement.click();
          this.pagoToast = true;
          setTimeout(() => {
            this.pagoToast = false;
            this.pagoErrors = [];
          }, 5000);
          this.pagoForm.reset();
          if (err.error.mensaje) {
            this.pagoErrors = [{ mensaje: err.error.mensaje }];
          } else {
            this.pagoErrors = err.error.errors as BackEndError[];
          }
        },

        complete: () => {
          this.pagoErrors = [];
          this.closeButton.nativeElement.click();
          this.pagoToast = true;
          setTimeout(() => {
            this.pagoToast = false;
          }, 5000);
          this.pagoForm.reset();
        },
      });
    }
  }

  get tokenPago() {
    return this.pagoForm.controls.tokenPago;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
