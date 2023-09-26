import { Component, Input, OnInit } from '@angular/core';
import {
  User,
  Customizer,
  CourseResponse,
} from 'src/app/core/interfaces/interfaces';

import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-set-of-buttons',
  templateUrl: './set-of-buttons.component.html',
  styleUrls: ['./set-of-buttons.component.css'],
})
export class SetOfButtonsComponent implements OnInit {
  buttons: {
    [key: string]: Customizer;
  } = buttonInteractions;
  userIsLoged = false;
  userData: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };

  @Input() courseData: CourseResponse = {
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

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userIsLoged) => {
        this.userIsLoged = userIsLoged;
      },
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
  }
}
