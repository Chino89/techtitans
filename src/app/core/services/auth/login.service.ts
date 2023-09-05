import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginRequest, User } from '../../interfaces/interfaces';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  });

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get userIsLogged(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/auth/iniciarsesion`, {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap((userData: User) => {
          this.currentUserData.next(userData);
          this.saveToken(userData.accessToken);
          this.currentUserLoginOn.next(true);
          return userData;
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
  }

  private checkToken() {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut() : this.currentUserLoginOn.next(true);
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
}
