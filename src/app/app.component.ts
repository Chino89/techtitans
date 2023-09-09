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
    this.loginService.checkLogin();
  }
}
