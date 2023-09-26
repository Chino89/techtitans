import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BackEndError,
  CourseResponse,
  CategoryDataResponse,
  TeacherDataResponse,
  CategoryData,
  TeacherData,
  CourseDetailResponse,
} from 'src/app/core/interfaces/interfaces';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { TeacherService } from 'src/app/core/services/users/teacher.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  greeting = 'Editando curso: ';
  errorGreeting = 'Se encontraron errores';
  editCourseToast = false;
  editCourseErrors: BackEndError[] = [];
  categories: CategoryData[] = [];
  teachers: TeacherData[] = [];
  file: Blob = new Blob();
  selectedPhoto: ArrayBuffer | string = '';
  invalidType = false;
  fileInputTouched = false;
  spinner = false;


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
      nombre: '',
    },
    usuario: {
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: {
      nombre: '',
      apellido: '',
    },
  };
  
  getData() {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoryDataResponse) => (this.categories = data.data),
      error: (errorData) => console.log(errorData),
    });
    this.teacherService.getTeachers().subscribe({
      next: (data: TeacherDataResponse) => (this.teachers = data.data),
      error: (errorData) => console.log(errorData),
    });
  }

  getCourse(identificator: number | string) {
    this.courseService.getCourseByIdOrSlug(identificator).subscribe({
      next: (data: CourseDetailResponse) => {
        this.oldCourseData = data.data;
        console.log(this.oldCourseData)
        
      },
      error: (errorData) => console.log(errorData),
    });
  }

  editCourseForm = this.formBuilder.group(
    {
      nombre: [this.oldCourseData.nombre, [Validators.required]],
      descripcion: [this.oldCourseData.descripcion, [Validators.required]],
      hasImage: [false, [Validators.requiredTrue]],
      dia: [this.oldCourseData.dia_curso, [Validators.required]],
      hora: [this.oldCourseData.hora_curso, [Validators.required]],
      duracion: [this.oldCourseData.duracion, [Validators.required]],
      precio: [
        this.oldCourseData.precio,
        [Validators.required, Validators.min(0)],
      ],
      categoriaId: [this.oldCourseData.categoria.nombre, [Validators.required]],
      docenteId: [this.oldCourseData.docente, [Validators.required]],
    },
    {
      validators: [MyValidators.validDate],
    }
  );


  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const identificator = this.route.snapshot.paramMap.get('identificator') as
      | number
      | string;

    this.getCourse(identificator);
  }

  selectPhoto(event: any): void {
    if (event.target.files && event.target.files[0]!) {
      this.file = <File>event.target.files[0];
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
    this.spinner = true;
    

    console.log('estoy editando el curso');
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
}
