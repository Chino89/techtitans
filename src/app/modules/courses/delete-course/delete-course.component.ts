import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { CourseDetailResponse, CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import {
  BackEndError
} from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css'],
})
export class DeleteCourseComponent implements OnInit {
  message = 'Estás eliminando el siguiente curso';
  courseDeleteToast = false;
  toastKey = 'error';
  errorResponse: BackEndError[] = [];
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
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getCourse(identificator: number | string) {
    this.courseService.getCourseByIdOrSlug(identificator).subscribe({
      next: (data: CourseDetailResponse) => {
        this.courseData = data.data;
      },
      error: (errorData) => console.log(errorData),
    });
  }

  onDelete() {
    const param = this.courseData.id;
    this.courseService.deleteCourse(param).subscribe({
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
  }

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;

    this.getCourse(identificator);
  }
}
