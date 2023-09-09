import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LoginService } from './core/services/auth/login.service';
import { TokenService } from './core/services/auth/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService, private tokenService: TokenService) {}

  title = 'Incubadora del N.O.C';

  ngOnInit(): void {
    initFlowbite();
    const token = this.tokenService.checkToken();
    const payload = token!.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    if (values) {
      this.loginService.currentUserData.next(values)
    }    
  }
}
