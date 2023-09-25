import { Component, Input, OnInit } from '@angular/core';

import {
  actionButton,
  courseResponse,
} from 'src/app/core/interfaces/interfaces';
import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';

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

  buttons: {
    [key: string]: actionButton;
  } = buttonInteractions;

  constructor() {}

  ngOnInit(): void {}
}
