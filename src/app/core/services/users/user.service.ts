import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetUser,
  TeacherDataResponse,
  UserDataResponse,
  UserEditRequest,
} from '../../interfaces/userInterfaces';

import { environment } from 'src/environments/environment';
import { BackEndResponse } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>(
      `${environment.API_URL}/api/usuarios`
    );
  }

  getUser(id: Number): Observable<GetUser> {
    return this.http.get<GetUser>(`${environment.API_URL}/api/usuario/${id}`);
  }

  getTeachers(): Observable<TeacherDataResponse> {
    return this.http.get<TeacherDataResponse>(
      `${environment.API_URL}/api/usuarios/docentes`
    );
  }

  patchRole(userID: number, roles: string[]): Observable<BackEndResponse> {
    return this.http.post<BackEndResponse>(
      `${environment.API_URL}/api/usuarios/roles`,
      { userID, roles }
    );
  }

  editUser(id: Number, formData: UserEditRequest) {
    return this.http.put<BackEndResponse>(
      `${environment.API_URL}/api/usuario/${id}/roles`,
      { formData }
    );
  }

  deleteUser(id: number): Observable<BackEndResponse> {
    return this.http.delete<BackEndResponse>(
      `${environment.API_URL}/api/usuario/${id}/borrar`
    );
  }
}
