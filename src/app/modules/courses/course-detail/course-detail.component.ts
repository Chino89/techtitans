import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { courseData, courseResponse } from 'src/app/core/interfaces/interfaces';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  courseData: courseResponse = {
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
    categoria: { nombre: '' },
    usuario: {
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: { nombre: '', apellido: '' },
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;
    this.getCourse(identificator);
  }

  getCourse(identificator: number | string) {
    this.courseService.getCourseByIdOrSlug(identificator).subscribe({
      next: (data: courseData) => {
        this.courseData = data.data as courseResponse;
        console.log(this.courseData);
      },
      error: (errorData) => console.log(errorData),
    });
  }
}
