import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RegisterRequest, User } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(credentials: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/auth/registrarme`, {
      nombre: credentials.nombre,
      apellido: credentials.apellido,
      email: credentials.email,
      password: credentials.password,
    });
  }
}
