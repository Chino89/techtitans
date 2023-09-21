import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { courseRequest, courseResponse } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  createCourse(formData: FormData): Observable<courseRequest> {
    return this.http.post<courseRequest>(
      `${environment.API_URL}/api/curso/nuevo`,
      formData
    );
  }

  getAllCourses(): Observable<courseResponse[]> {
    return this.http.get<courseResponse[]>(`${environment.API_URL}/api/cursos`);
  }
}
