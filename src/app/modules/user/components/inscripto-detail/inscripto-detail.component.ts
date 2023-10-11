import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AttendanceDetail,
  CourseDetailResponse,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { attendanceDto } from 'src/app/core/interfaces/enrollmentInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { mensajeResponse } from 'src/app/core/interfaces/paymentInterfaces';
import { CourseService } from 'src/app/core/services/course/course.service';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import { modalTarget } from 'src/app/utils/modal';

@Component({
  selector: 'app-inscripto-detail',
  templateUrl: './inscripto-detail.component.html',
  styleUrls: ['./inscripto-detail.component.css'],
})
export class InscriptoDetailComponent implements OnInit {
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;
  inscripErrors: BackEndError[] = [];

  courseData: CourseResponse = {
    id: 0,
    nombre: '',
    descripcion: '',
    portada: '',
    public_id: '',
    dia_curso: '',
    hora_curso: '',
    duracion: '',
    precio: '',
    slug: '',
    categoria: { id: 0, nombre: '' },
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: { id: 0, nombre: '', apellido: '' },
    asistencia: [
      {
        id: 0,
        codigoInscripcion: '',
        asistio: false,
        puntaje: '',
        estudiante: {
          id: 0,
          nombre: '',
          apellido: '',
          email: '',
        },
        pago: {
          id: 0,
          tokenPago: '',
          fechaPago: null,
          pago: false,
        },
      },
    ],
  };

  asistencia: AttendanceDetail[] = [];
  asistenciaForm = this.formBuilder.group({
    asistio: ['', [Validators.required]],
    calificacion: ['', [Validators.required]],
  });

  asistenciaMsj: string = '';
  asistenciaToast: boolean = false;
  asistenciaError: BackEndError[] = [];
  slugCurso: string | number = '';

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;
    this.getCourse(identificator);
    this.slugCurso = identificator;
  }

  getCourse(identificator: number | string) {
    this.courseService.getCourseByIdOrSlug(identificator).subscribe({
      next: (data: CourseDetailResponse) => {
        this.courseData = data.data;
        this.asistencia = data.data.asistencia;
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

  openModal(codigoInscripcion: string): void {
    const modal = modalTarget(`attendanceModal-${codigoInscripcion}`);
    modal.show();
  }

  closeModal(codigoInscripcion: string): void {
    const modal = modalTarget(`attendanceModal-${codigoInscripcion}`);
    this.resetForm();
    modal.hide();
  }

  markAttendance(codigoInscripcion: string): void {
    const { asistio, calificacion } = this.asistenciaForm.value;

    let asistioBool = /true/i.test(asistio!);

    let data: attendanceDto = {
      asistio: asistioBool,
      puntaje: calificacion!,
    };

    this.enrollmentService.markAttendance(codigoInscripcion, data).subscribe({
      next: (res: mensajeResponse) => {
        this.asistenciaMsj = res.mensaje;
        this.closeButton.nativeElement.click();
      },
      error: (err) => {
        this.closeButton.nativeElement.click();
        this.getCourse(this.slugCurso);
        this.asistenciaToast = true;
        setTimeout(() => {
          this.asistenciaToast = false;
          this.asistenciaError = [];
        }, 5000);
        this.resetForm();
        if (err.error.mensaje) {
          this.asistenciaError = [{ mensaje: err.error.mensaje }];
        } else {
          this.asistenciaError = err.error.errors as BackEndError[];
        }
      },
      complete: () => {
        this.asistenciaError = [];
        this.closeButton.nativeElement.click();
        this.getCourse(this.slugCurso);
        this.asistenciaToast = true;
        setTimeout(() => {
          this.asistenciaToast = false;
        }, 5000);
        this.resetForm();
      },
    });
  }

  get asistio() {
    return this.asistenciaForm.controls.asistio;
  }

  get calificacion() {
    return this.asistenciaForm.controls.calificacion;
  }

  resetForm(): void {
    this.asistenciaForm.patchValue({
      asistio: '',
      calificacion: '',
    });

    this.asistenciaForm.markAsPristine();
    this.asistenciaForm.markAsUntouched();
  }
}
