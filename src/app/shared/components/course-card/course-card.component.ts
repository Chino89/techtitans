import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customizer } from 'src/app/core/interfaces/interfaces';
import { CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import {
  UserEnrollment,
  UserEnrollmentData,
} from 'src/app/core/interfaces/enrollmentInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit, OnDestroy {
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
  };

  buttons: {
    [key: string]: Customizer;
  } = buttonInteractions;
  subscriptions: Subscription[] = [];
  userCoursesResponse: UserEnrollmentData[] = [];
  inscriptionCode = '';
  paymentToken = '';

  navigateTo(courseIdentification: string) {
    this.router.navigate([`/cursos/${courseIdentification}`]);
  }

  constructor(
    private router: Router,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const getMyCoursesServiceSubscription = this.enrollmentService
      .getMyCourses()
      .subscribe({
        next: (response: UserEnrollment) => {
          this.userCoursesResponse = response.data;
          for (const course of this.userCoursesResponse) {
            const enrollmentCourse = course.curso.nombre;
            if (enrollmentCourse === this.courseContent.nombre) {
              this.inscriptionCode = course.codigoInscripcion;
              this.paymentToken = course.pago.tokenPago;
            }
          }
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
