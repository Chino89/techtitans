import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/interfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsLoged: boolean = false;
  userData?: User;
  showInstitucional = false;
  showMobileMenu = false;
  dropdown = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userIsLoged) => {
        this.userIsLoged = userIsLoged;
      },
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        if (userData.nombre !== '') {
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      },
    });

    const _userData = localStorage.getItem('userData');
    const _userDataObj = JSON.parse(_userData ?? '{}');
    if (_userDataObj && _userDataObj.nombre !== '') {
      this.userData = _userDataObj;
    }
  }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }

  openMobileMenu() {
    this.showMobileMenu = true;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
    this.showInstitucional = false;
  }

  toggleInstitucional() {
    this.showInstitucional = !this.showInstitucional;
  }

  action() {
    this.dropdown = !this.dropdown;
  }

  onLogOut() {
    this.loginService.logOut();
    localStorage.removeItem('userData');
    this.router.navigateByUrl('');
  }
}
