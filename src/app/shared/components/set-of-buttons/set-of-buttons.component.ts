import { Component, OnInit } from '@angular/core';
import { User, actionButton } from 'src/app/core/interfaces/interfaces';

import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-set-of-buttons',
  templateUrl: './set-of-buttons.component.html',
  styleUrls: ['./set-of-buttons.component.css'],
})
export class SetOfButtonsComponent implements OnInit {
  buttons: {
    [key: string]: actionButton;
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
