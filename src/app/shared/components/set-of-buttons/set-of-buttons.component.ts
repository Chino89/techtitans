import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Customizer } from 'src/app/core/interfaces/interfaces';

import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { User } from 'src/app/core/interfaces/userInterfaces';
import { CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-of-buttons',
  templateUrl: './set-of-buttons.component.html',
  styleUrls: ['./set-of-buttons.component.css'],
})
export class SetOfButtonsComponent implements OnInit, OnDestroy {
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
  subscriptions: Subscription[] = [];

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
    const currentUserLoginOnServiceSubscription =
      this.loginService.currentUserLoginOn.subscribe({
        next: (userIsLoged) => {
          this.userIsLoged = userIsLoged;
        },
      });
    this.subscriptions.push(currentUserLoginOnServiceSubscription);

    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          this.userData = userData;
        },
      });
    this.subscriptions.push(currentUserDataServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
