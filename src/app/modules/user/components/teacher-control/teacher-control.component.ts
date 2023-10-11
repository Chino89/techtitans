import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  AttendanceDetail,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import {
  UserEnrollment,
  UserEnrollmentData,
} from 'src/app/core/interfaces/enrollmentInterfaces';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';

@Component({
  selector: 'app-teacher-control',
  templateUrl: './teacher-control.component.html',
  styleUrls: ['./teacher-control.component.css'],
})
export class TeacherControlComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input() courseContent: CourseResponse = {
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
  allAttendances: AttendanceDetail[] = [];
  asistence = 0;

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.allAttendances = this.courseContent.asistencia;
    this.asistence = this.courseContent.asistencia.length;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
