import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LoginService } from './core/services/auth/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  title = 'Incubadora del N.O.C';

  ngOnInit(): void {
    initFlowbite();
    this.loginService.checkLogin();
  }
}
