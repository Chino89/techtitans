import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/core/services/course/course.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
import {
  CourseResponse,
  CourseDetailResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { User } from 'src/app/core/interfaces/userInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
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
  userSuscribed = false;
  setKey = '';

  userIsLoged = false;
  userData: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };
  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;
    this.getCourse(identificator);

    const currentUserLoginOnServiceSubscription =
      this.loginService.currentUserLoginOn.subscribe({
        next: (userIsLoged) => {
          this.userIsLoged = userIsLoged;
        },
      });

    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          this.userData = userData;
        },
      });

    this.subscriptions.push(
      currentUserDataServiceSubscription,
      currentUserLoginOnServiceSubscription
    );
  }

  getCourse(identificator: number | string) {
    const getCoursesByIdOrSlugServiceSubscription = this.courseService
      .getCourseByIdOrSlug(identificator)
      .subscribe({
        next: (data: CourseDetailResponse) => {
          this.courseData = data.data;
        },
        error: (errorData) => console.log(errorData),
      });
    this.subscriptions.push(getCoursesByIdOrSlugServiceSubscription);
  }

  showToast(key: string) {
    this.userSuscribed = true;
    this.setKey = key;
    setTimeout(() => {
      this.router.navigateByUrl('/usuario/mis-cursos');
    }, 3000);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
