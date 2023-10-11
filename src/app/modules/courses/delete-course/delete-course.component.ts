import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import {
  CourseDetailResponse,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css'],
})
export class DeleteCourseComponent implements OnInit, OnDestroy {
  message = 'Estás eliminando el siguiente curso';
  courseDeleteToast = false;
  toastKey = 'error';
  errorResponse: BackEndError[] = [];
  subscriptions: Subscription[] = [];
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
    asistencia: [{
      id: 0,
      codigoInscripcion: '',
      asistio: false,
      puntaje: '',
      estudiante: {
        id: 0,
        nombre: '',
        apellido: '',
        email: ''
      },
      pago: {
        id: 0,
        tokenPago: '',
        fechaPago: null,
        pago: false
      }
    }]
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getCourse(identificator: number | string) {
    const getCourseByIdOrSlugServiceSubscription = this.courseService
      .getCourseByIdOrSlug(identificator)
      .subscribe({
        next: (data: CourseDetailResponse) => {
          this.courseData = data.data;
        },
        error: (errorData) => console.log(errorData),
      });
    this.subscriptions.push(getCourseByIdOrSlugServiceSubscription);
  }

  onDelete() {
    const param = this.courseData.id;
    const deleteCourseServiceSubscription = this.courseService
      .deleteCourse(param)
      .subscribe({
        error: (errorData) => {
          this.courseDeleteToast = true;
          this.toastKey = 'error';
          if (errorData.error.mensaje) {
            this.errorResponse = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.errorResponse = errorData.error.errors as BackEndError[];
          }
        },
        complete: () => {
          this.courseDeleteToast = true;
          this.toastKey = 'check';
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 3000);
        },
      });
    this.subscriptions.push(deleteCourseServiceSubscription);
  }

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;

    this.getCourse(identificator);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
