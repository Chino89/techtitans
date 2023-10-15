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
import { modalTarget } from 'src/app/utils/modal';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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
      descripcion: '',
      portada: '',
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
  downloadErrors: BackEndError[] = [];
  payErrors: BackEndError[] = [];
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

  pdfBlob: Blob | null = null;
  qrBlob: Blob | null = null;
  qrBlobUrl: SafeUrl | null = null;

  idModal: string = 'QRModal';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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

  // Metodos para pagar y descargar certificados
  downloadCertificate(attendanceData: attendanceResponse): void {
    const { curso, pago, codigoInscripcion, estudiante, asistio, puntaje } =
      attendanceData;
    const { slug } = curso;
    const { nombre, apellido } = estudiante;
    let fullname = `${nombre.toLowerCase()}-${apellido.toLowerCase()}`;
    this.enrollmentService.getCertificate(codigoInscripcion).subscribe({
      next: (data: Blob) => {
        setTimeout(() => {
          this.pdfBlob = data;
          if (pago.pago) {
            if (asistio && puntaje === 'Aprobado') {
              this.createDownloadLink(fullname, slug);
            }
          } else {
            let msg = 'No pago el curso, no puede descargar el certificado';
            this.asistenciaError.push({ mensaje: msg });
          }
        });
      },
      error(err) {
        //TODO: aca debiera mostrar un toast de que no pudo descargar el certificado con éxito

        console.error(err.error.mensaje);
        // this.asistenciaError.push({ mensaje: err.error.mensaje });
      },
      complete: () => {
        this.asistenciaMsj = 'Se descargó el certificado con éxito';
        this.asistenciaToast = true;

        setTimeout(() => {
          this.asistenciaToast = false;
        }, 5000);
      },
    });
  }
  createDownloadLink(fullname: string, slug: string) {
    if (this.pdfBlob) {
      const url = window.URL.createObjectURL(this.pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificado-${fullname}-${slug}.pdf`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  }

  openModal(): void {
    const modal = modalTarget(`${this.idModal}`);
    modal.show();
  }

  closeModal(): void {
    const modal = modalTarget(`${this.idModal}`);
    modal.hide();
  }

  openModalAndShowQR(tokenPago: string | null): void {
    if (tokenPago != null) {
      this.enrollmentService.getQRCodePay(tokenPago).subscribe({
        next: (data: Blob) => {
          setTimeout(() => {
            this.qrBlob = data;
            this.qrBlobUrl = this.getQRCodeObjectUrl(data);
            this.openModal();
          });
        },
        error: (err) => {
          //TODO: aca debiera mostrar un toast de que no pudo descargar el certificado con éxito
        },
        complete: () => {},
      });
    }
  }

  getQRCodeObjectUrl(blob: Blob | null): SafeUrl {
    if (blob) {
      return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    }
    return '';
  }

}
