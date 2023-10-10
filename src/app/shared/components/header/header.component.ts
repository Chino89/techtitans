import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';

import adminOptions from '../../../../assets/icons/adminDropdown.json';
import institutionalOptions from '../../../../assets/icons/institutionalDropdown.json';
import { UserService } from 'src/app/core/services/users/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsLoged = false;
  userData?: User;
  userDetail?: UserResponse;
  showMobileMenu = false;
  showInstitucional = false;
  showAdminGestion = false;
  dropdown = false;
  adminDropdown = false;
  institutionalDropdown = false;
  adminDropdownItems = adminOptions;
  institutionalDropdownItems = institutionalOptions;
  currentDropdown = '';
  subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentDropdown = '';
        this.showMobileMenu = false;
      }
      this.subscriptions.push(routerEventSubscription);
    });

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
          if (userData.nombre !== '') {
            localStorage.setItem('userData', JSON.stringify(userData));
            this.getUserDetail();
          }
        },
      });
    this.subscriptions.push(currentUserDataServiceSubscription);

    const _userData = localStorage.getItem('userData');
    const _userDataObj = JSON.parse(_userData ?? '{}');
    if (_userDataObj && _userDataObj.nombre !== '') {
      this.userData = _userDataObj;
    }
  }

  getUserDetail() {
    const getUserDataServiceSubscription = this.userService
      .getUserData()
      .subscribe({
        next: (response) => {
          this.userDetail = response.data;
        },
      });
    this.subscriptions.push(getUserDataServiceSubscription);
  }

  openMobileMenu() {
    this.showMobileMenu = true;
  }

  myToggleDropdown(dropdownName: string) {
    this.currentDropdown =
      this.currentDropdown === dropdownName ? '' : dropdownName;
  }

  navigateToPage(event: Event, link: string) {
    this.router.navigate([link]);
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
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
    this.router.navigateByUrl('');
    this.showMobileMenu = false;
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
