import { Component, OnInit } from '@angular/core';

import { backEndError } from 'src/app/core/interfaces/interfaces';
import { TokenService } from 'src/app/core/services/auth/token.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  greeting: string = 'Bienvenido a nuestro portal';
  verifyError: backEndError[] = [];
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    const token = this.tokenService.getParamToken();
    this.tokenService.saveToken(token as string);
  }
}
