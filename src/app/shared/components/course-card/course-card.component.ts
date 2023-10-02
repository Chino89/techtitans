import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customizer } from 'src/app/core/interfaces/interfaces';
import { CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() courseContent: CourseResponse = {
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
    docente: { id: 0, nombre: '', apellido: '' },
  };

  buttons: {
    [key: string]: Customizer;
  } = buttonInteractions;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(courseIdentification: string) {
    this.router.navigate([`/cursos/${courseIdentification}`]);
  }
}


