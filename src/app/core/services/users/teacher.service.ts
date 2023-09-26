import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { TeacherDataResponse } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<TeacherDataResponse> {
    return this.http.get<TeacherDataResponse>(`${environment.API_URL}/api/usuarios/docentes`);
  }
}
