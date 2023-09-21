import { Component, Input, OnInit } from '@angular/core';

import { courseResponse } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() courseContent: courseResponse = {
    id: 0,
    nombre: '',
    descripcion: '',
    portada: '',
    dia_curso: '',
    hora_curso: '',
    duracion: '',
    precio: '',
    slug: '',
    categoria: '',
    docente: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
