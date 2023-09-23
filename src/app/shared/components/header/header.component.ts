import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/interfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';

import adminOptions from '../../../../assets/icons/adminDropdown.json';
import institutionalOptions from '../../../../assets/icons/institutionalDropdown.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsLoged: boolean = false;
  userData?: User;
  showMobileMenu: boolean = false;
  showInstitucional: boolean  = false;
  showAdminGestion: boolean = false;
  dropdown: boolean = false;
  adminDropdown: boolean = false;
  institutionalDropdown: boolean = false;
  adminDropdownItems = adminOptions;
  institutionalDropdownItems = institutionalOptions;

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

  toggleAdminManagement() {
    this.adminDropdown = !this.adminDropdown;
    if (this.institutionalDropdown) {
      this.institutionalDropdown = false;
    } 
  }

  toggleInstitutional () {
    this.institutionalDropdown = !this.institutionalDropdown;
    if (this.adminDropdown) {
      this.adminDropdown = false;
    } 
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
    this.showInstitucional = false;
    this.showAdminGestion = false;

  }

  mobileToggleInstitucional() {
    this.showInstitucional = !this.showInstitucional;
    if (this.showAdminGestion) {
      this.showAdminGestion = false;
    } 
  }

  mobileToggleAdminManagement() {
    this.showAdminGestion = !this.showAdminGestion;
    if (this.showInstitucional) {
      this.showInstitucional = false;
    } 
  }

  onLogOut() {
    this.loginService.logOut();
    localStorage.removeItem('userData');
    this.router.navigateByUrl('');
  }
}
