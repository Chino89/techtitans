import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MyValidators } from 'src/app/utils/validators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import {
  TeacherData,
  TeacherDataResponse,
} from 'src/app/core/interfaces/userInterfaces';
import {
  CourseDetailResponse,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import {
  CategoryData,
  CategoryDataResponse,
} from 'src/app/core/interfaces/categoryInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
  greeting = 'Editando curso: ';
  errorGreeting = 'Se encontraron errores';
  editCourseToast = false;
  hasCourse = false;
  forceExit = false;
  nextRoute = '';
  editCourseErrors: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  categories: CategoryData[] = [];
  teachers: TeacherData[] = [];
  file: Blob | null = null;
  selectedPhoto: ArrayBuffer | string = '';
  invalidType = false;
  fileInputTouched = false;
  spinner = false;
  hasChange = false;

  oldCourseData: CourseResponse = {
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
    categoria: {
      id: 0,
      nombre: '',
    },
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

  identificator = this.route.snapshot.paramMap.get('identificator') as
    | number
    | string;

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

  getCourse(identificator: number | string) {
    const getCourseByIdOrSlugServiceSubscription = this.courseService
      .getCourseByIdOrSlug(identificator)
      .subscribe({
        next: (data: CourseDetailResponse) => {
          this.oldCourseData = data.data;
          this.editCourseForm.patchValue(data.data);
          this.selectedPhoto = data.data.portada;
          this.editCourseForm.controls.dia.setValue(data.data.dia_curso);
          this.editCourseForm.controls.hora.setValue(data.data.hora_curso);
          this.editCourseForm.controls.categoriaId.setValue(
            data.data.categoria.id
          );
          this.editCourseForm.controls.docenteId.setValue(data.data.docente.id);
        },
        error: (errorData) => console.log(errorData),
      });
    this.subscriptions.push(getCourseByIdOrSlugServiceSubscription);
  }

  editCourseForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      hasImage: [true, [Validators.requiredTrue]],
      dia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoriaId: [0, [Validators.required]],
      docenteId: [0, [Validators.required]],
    },
    {
      validators: [MyValidators.validDate],
    }
  );

  selectPhoto(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      this.file = inputElement.files[0] as File;
      if (MyValidators.requiredFileType(this.file)) {
        const reader = new FileReader();
        reader.onload = (e) =>
          (this.selectedPhoto = reader.result as ArrayBuffer);
        reader.readAsDataURL(this.file);
        this.editCourseForm.patchValue({ hasImage: true });
        this.editCourseForm.updateValueAndValidity();
      } else {
        this.invalidType = true;
      }
    }
  }

  setFileInputTouched() {
    this.fileInputTouched = true;
  }

  onEditCourse() {
    const param = this.oldCourseData.id;
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
    } = this.editCourseForm.value as any;

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('dia', dia);
    formData.append('hora', hora);
    formData.append('duracion', duracion);
    formData.append('precio', precio);
    formData.append('categoriaId', categoriaId);
    formData.append('docenteId', docenteId);
    this.file && formData.append('imageFile', this.file);

    if (this.editCourseForm.valid) {
      const editCourseServiceSubscription = this.courseService
        .editCourse(formData, param)
        .subscribe({
          error: (errorData) => {
            this.spinner = false;
            if (errorData.error.mensaje) {
              this.editCourseErrors = [{ mensaje: errorData.error.mensaje }];
            } else {
              this.editCourseErrors = errorData.error.errors as BackEndError[];
            }
          },
          complete: () => {
            console.info('Curso editado');
            this.editCourseToast = true;
            this.hasCourse = true;
            this.spinner = false;
            setTimeout(() => {
              this.router.navigateByUrl('/cursos');
            }, 3000);
          },
        });
      this.subscriptions.push(editCourseServiceSubscription);
    }
  }

  formHasChange(field: string) {
    const currentValue = (this.editCourseForm.value as any)[field];
    const initialValue = this.oldCourseData[field];
    this.hasChange = currentValue !== initialValue;
  }

  checkFormHasChanged() {
    return (
      this.editCourseForm.invalid ||
      (this.editCourseForm.valid && !this.hasChange && this.file === null)
    );
  }

  navigate() {
    this.forceExit = true;
    this.router.navigateByUrl(this.nextRoute);
  }

  closeToast() {
    this.editCourseToast = false;
  }

  get nombre() {
    return this.editCourseForm.controls.nombre;
  }
  get descripcion() {
    return this.editCourseForm.controls.descripcion;
  }
  get hasImage() {
    return this.editCourseForm.controls.hasImage;
  }
  get dia() {
    return this.editCourseForm.controls.dia;
  }
  get hora() {
    return this.editCourseForm.controls.hora;
  }
  get duracion() {
    return this.editCourseForm.controls.duracion;
  }
  get precio() {
    return this.editCourseForm.controls.precio;
  }
  get categoriaId() {
    return this.editCourseForm.controls.categoriaId;
  }
  get docenteId() {
    return this.editCourseForm.controls.docenteId;
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourse(this.identificator);
    this.getData();
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
