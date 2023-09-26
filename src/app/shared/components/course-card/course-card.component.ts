import { Component, Input, OnInit } from '@angular/core';

import { CourseResponse, Customizer } from 'src/app/core/interfaces/interfaces';
import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { Router } from '@angular/router';

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
    categoria: { nombre: '' },
    usuario: {
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: { nombre: '', apellido: '' },
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
