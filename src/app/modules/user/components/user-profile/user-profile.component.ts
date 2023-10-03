import { Component, OnInit } from '@angular/core';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserData.subscribe((data) => {
      this.user = data;
      this.getUserDetail(this.user.id);
    });
  }

  getUserDetail(userId: number) {
    this.userService.getUserData().subscribe({
      next: (response) => {
        this.userDetail = response.data;
      },
    });
  }
}
