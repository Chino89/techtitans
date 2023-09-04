import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(credentials: RegisterRequest): Observable<User> {
    return this.http.post<User>('http://localhost:3000/auth/registrarme', {
      nombre: credentials.nombre,
      apellido: credentials.apellido,
      email: credentials.email,
      password: credentials.password,
    });

  }

}
