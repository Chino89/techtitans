import { Injectable } from '@angular/core';
import { LoginRequest, User } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
      .post<User>('http://localhost:3000/auth/iniciarsesion', {
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
