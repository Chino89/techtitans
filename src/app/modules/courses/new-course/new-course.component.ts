import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { backEndError } from 'src/app/core/interfaces/interfaces';
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
  greeting: string = 'Creando curso';
  errorGreeting: string = 'Se encontraron errores';
  courseError: backEndError[] = [];
  selectedPhoto: ArrayBuffer | string = '';
  file: Blob | null = null;
  fileInputTouched = false;
  invalidType: boolean = false;


  newCourseForm = this.formBuilder.group({
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
    validators: [MyValidators.validDate]
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  createCourse() {
    console.log(this.newCourseForm.value, 'el form');

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
