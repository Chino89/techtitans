import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherDataResponse, UserDataResponse } from '../../interfaces/userInterfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>(`${environment.API_URL}/api/usuarios`);
  };

  getTeachers(): Observable<TeacherDataResponse> {
    return this.http.get<TeacherDataResponse>(`${environment.API_URL}/api/usuarios/docentes`);
  };
  
}
