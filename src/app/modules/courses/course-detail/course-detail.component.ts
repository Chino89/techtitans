import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from 'src/app/core/services/course/course.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
import {
  User,
  CourseResponse,
  CourseDetailResponse,
} from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
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
    docente: {
      id: 0,
      nombre: '',
      apellido: '',
    },
  };

  userIsLoged = false;
  userData: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };

  constructor(
    private courseService: CourseService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;
    this.getCourse(identificator);

    this.loginService.currentUserLoginOn.subscribe({
      next: (userIsLoged) => {
        this.userIsLoged = userIsLoged;
      },
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
  }

  getCourse(identificator: number | string) {
    this.courseService.getCourseByIdOrSlug(identificator).subscribe({
      next: (data: CourseDetailResponse) => {
        this.courseData = data.data;
        console.log(this.courseData);
      },
      error: (errorData) => console.log(errorData),
    });
  }
}
