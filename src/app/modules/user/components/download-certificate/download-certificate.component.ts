import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  attendanceData,
  attendanceResponse,
} from 'src/app/core/interfaces/attendanceInterface';
import {
  AttendanceDetail,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { UserEnrollment } from 'src/app/core/interfaces/enrollmentInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.css'],
})
export class DownloadCertificateComponent implements OnInit {
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;
  inscripErrors: BackEndError[] = [];

  attendanceDataBack: attendanceResponse = {
    id: 0,
    codigoInscripcion: '',
    asistio: false,
    puntaje: 'No calificado',
    curso: {
      id: 0,
      nombre: '',
      descripcion:
        '',
      portada:
        '',
      dia_curso: null,
      hora_curso: '',
      duracion: '',
      precio: '',
      lugar: '',
      slug: '',
      categoria: {
        id: 0,
        nombre: '',
      },
      usuario: {
        id: 0,
        nombre: '',
        apellido: '',
        email: '',
      },
      docente: {
        id: 0,
        nombre: '',
        apellido: '',
        email: '',
      },
    },
    estudiante: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
    },
    pago: {
      id: 0,
      tokenPago: null,
      fechaPago: null,
      pago: false,
    },
  };

  asistencia: AttendanceDetail[] = [];
  asistenciaForm = this.formBuilder.group({
    asistio: ['', [Validators.required]],
    calificacion: ['', [Validators.required]],
  });

  asistenciaMsj: string = '';
  asistenciaToast: boolean = false;
  asistenciaError: BackEndError[] = [];
  codigoInscripcion: string = '';

  userIsLoged = false;
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

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe((data) => {
        this.user = data;
        this.getUserDetail();
      });
    this.subscriptions.push(currentUserDataServiceSubscription);

    const currentUserLoginOnServiceSubscription =
      this.loginService.currentUserLoginOn.subscribe({
        next: (userIsLoged) => {
          this.userIsLoged = userIsLoged;
        },
      });
    this.subscriptions.push(currentUserLoginOnServiceSubscription);

    const identificator: string = this.route.snapshot.paramMap.get(
      'identificator'
    ) as string;
    this.getCourse(identificator);
    this.codigoInscripcion = identificator;
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

  getCourse(codigoInscripcion: string): void {
    this.enrollmentService.getMyCoursesByCode(codigoInscripcion).subscribe({
      next: (data: attendanceData) => {
        this.attendanceDataBack = data.data;
      },
      error: (err) => {
        if (err.error.mensaje) {
          this.inscripErrors = [{ mensaje: err.error.mensaje }];
        } else {
          this.inscripErrors = err.error.errors as BackEndError[];
        }
      },
      complete: () => {},
    });
  }
}
