import { Injectable } from '@angular/core';
import { LoginRequest, User } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: ''
  });

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>('http://localhost:3000/auth/iniciarsesion', {email: credentials.email , password: credentials.password}).pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      })
    );
  }

  get userData(): Observable<User>{
    return this.currentUserData.asObservable();
  }
}
