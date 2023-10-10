import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { CourseRequest } from 'src/app/core/interfaces/courseInterfaces';
import { MyValidators } from 'src/app/utils/validators';
import {
  CategoryData,
  CategoryDataResponse,
} from 'src/app/core/interfaces/categoryInterfaces';
import {
  TeacherData,
  TeacherDataResponse,
} from 'src/app/core/interfaces/userInterfaces';
import { Subscription } from 'rxjs';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
})
export class NewCourseComponent implements OnInit, OnDestroy {
  greeting = 'Crear un nuevo curso';
  errorGreeting = 'Se encontraron errores';
  newCourseToast = false;
  hasCourse = false;
  newCourseError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  selectedPhoto: ArrayBuffer | string = '';
  file: Blob = new Blob();
  fileInputTouched = false;
  invalidType = false;
  categories: CategoryData[] = [];
  teachers: TeacherData[] = [];
  forceExit = false;
  nextRoute = '';
  spinner = false;

  newCourseForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      hasImage: [false, [Validators.requiredTrue]],
      dia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoriaId: ['', [Validators.required]],
      docenteId: ['', [Validators.required]],
    },
    {
      validators: [MyValidators.validDate],
    }
  );

  getData() {
    const getCategoriesServiceSubscription = this.categoryService
      .getCategories()
      .subscribe({
        next: (data: CategoryDataResponse) => (this.categories = data.data),
        error: (errorData) => console.log(errorData),
      });
    const getTeachersServiceSubscription = this.userService
      .getTeachers()
      .subscribe({
        next: (data: TeacherDataResponse) => (this.teachers = data.data),
        error: (errorData) => console.log(errorData),
      });
    this.subscriptions.push(
      getTeachersServiceSubscription,
      getCategoriesServiceSubscription
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  selectPhoto(event: any): void {
    if (event.target.files && event.target.files[0]!) {
      this.file = <File>event.target.files[0];
      if (MyValidators.requiredFileType(this.file)) {
        const reader = new FileReader();
        reader.onload = (e) =>
          (this.selectedPhoto = reader.result as ArrayBuffer);
        reader.readAsDataURL(this.file);
        this.newCourseForm.patchValue({ hasImage: true });
        this.newCourseForm.updateValueAndValidity();
      } else {
        this.invalidType = true;
      }
    }
  }

  setFileInputTouched() {
    this.fileInputTouched = true;
  }

  createCourse() {
    this.spinner = true;
    const formData = new FormData();
    const {
      nombre,
      descripcion,
      dia,
      hora,
      duracion,
      precio,
      categoriaId,
      docenteId,
    } = this.newCourseForm.value as CourseRequest;

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('dia', dia);
    formData.append('hora', hora);
    formData.append('duracion', duracion);
    formData.append('precio', precio);
    formData.append('categoriaId', categoriaId);
    formData.append('docenteId', docenteId);
    formData.append('imageFile', this.file);

    if (this.newCourseForm.valid) {
      const createCourseServiceSubscription = this.courseService
        .createCourse(formData)
        .subscribe({
          error: (errorData) => {
            this.spinner = false;
            if (errorData.error.mensaje) {
              this.newCourseError = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.newCourseError = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            console.info('Curso creado');
            this.newCourseToast = true;
            this.hasCourse = true;
            this.spinner = false;
            setTimeout(() => {
              this.router.navigateByUrl('/cursos');
            }, 3000);
          },
        });
      this.subscriptions.push(createCourseServiceSubscription);
    }
  }

  closeToast() {
    this.newCourseToast = false;
  }

  onExit(nextRoute: RouterStateSnapshot | undefined) {
    if (this.forceExit) {
      return true;
    }
    if (this.newCourseForm.dirty && !this.hasCourse) {
      this.newCourseToast = true;
      this.nextRoute = nextRoute!.url;
      return false;
    }
    return true;
  }

  navigate() {
    this.forceExit = true;
    this.router.navigateByUrl(this.nextRoute);
  }

  get nombre() {
    return this.newCourseForm.controls.nombre;
  }
  get descripcion() {
    return this.newCourseForm.controls.descripcion;
  }
  get hasImage() {
    return this.newCourseForm.controls.hasImage;
  }
  get dia() {
    return this.newCourseForm.controls.dia;
  }
  get hora() {
    return this.newCourseForm.controls.hora;
  }
  get duracion() {
    return this.newCourseForm.controls.duracion;
  }
  get precio() {
    return this.newCourseForm.controls.precio;
  }
  get categoriaId() {
    return this.newCourseForm.controls.categoriaId;
  }
  get docenteId() {
    return this.newCourseForm.controls.docenteId;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
