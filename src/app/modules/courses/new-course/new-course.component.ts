import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { TeacherService } from 'src/app/core/services/users/teacher.service';
import {
  backEndError,
  courseRequest,
} from 'src/app/core/interfaces/interfaces';
import { MyValidators } from 'src/app/utils/validators';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
})
export class NewCourseComponent implements OnInit {
  greeting: string = 'Crear un nuevo curso';
  errorGreeting: string = 'Se encontraron errores';
  newCourseToast: boolean = false;
  hasCourse: boolean = false;
  newCourseError: backEndError[] = [];
  selectedPhoto: ArrayBuffer | string = '';
  file: Blob = new Blob();
  fileInputTouched = false;
  invalidType: boolean = false;
  categories: any;
  teachers: any;
  forceExit: boolean = false;
  nextRoute: string = '';
  spinner: boolean = false;

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
    this.categoryService.getCategories().subscribe({
      next: (data: any) => (this.categories = data.data),
      error: (errorData) => console.log(errorData),
    });
    this.teacherService.getTeachers().subscribe({
      next: (data: any) => (this.teachers = data.data),
      error: (errorData) => console.log(errorData),
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private teacherService: TeacherService,
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
    } = this.newCourseForm.value as courseRequest;

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
      this.courseService.createCourse(formData).subscribe({
        error: (errorData) => {
          if (errorData.error.mensaje) {
            this.newCourseError = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.newCourseError = errorData.error.errors as backEndError[];
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
}
