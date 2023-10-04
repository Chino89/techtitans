import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css'],
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  user: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };
  userDetail: UserResponse = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    avatar: '',
    public_id: null,
    status: false,
  };
  subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe((data) => {
        this.user = data;
        this.getUserDetail(this.user.id);
      });
    this.subscriptions.push(currentUserDataServiceSubscription);
  }

  getUserDetail(userId: number) {
    const getUserServiceSubscription = this.userService
      .getUser(userId)
      .subscribe({
        next: (response) => {
          this.userDetail = response.data;
        },
      });
    this.subscriptions.push(getUserServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
