import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginRequest, User } from '../../interfaces/interfaces';
import { TokenService } from './token.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.checkToken();
  }

  get userIsLogged(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  currentUserLoginOn = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  });


  login(credentials: LoginRequest): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/auth/iniciarsesion`, credentials)
      .pipe(
        tap((response: any) => {
          this.currentUserData.next(response.user);
          this.tokenService.saveToken(response.user.accessToken);
          this.currentUserLoginOn.next(true);
          return response;
        })
      );
  }

  checkLogin() {
      const token = this.tokenService.checkToken(); 
      if(token) {
        const payload = token!.split('.')[1];
          const payloadDecoded = atob(payload);
          const values = JSON.parse(payloadDecoded);
          if (values) {
            this.currentUserData.next(values)  
          }     
    }

  }

  logOut() {
    this.tokenService.removeToken();
    this.currentUserLoginOn.next(false);
  }

  private checkToken() {
    const userToken = this.tokenService.checkToken();
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut() : this.currentUserLoginOn.next(true);
  }
}
