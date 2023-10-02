import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  BackEndResponse,
} from '../../interfaces/interfaces';
import { CourseData, CourseDetailResponse, CourseRequest } from '../../interfaces/courseInterfaces';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  createCourse(formData: FormData): Observable<CourseRequest> {
    return this.http.post<CourseRequest>(
      `${environment.API_URL}/api/curso/nuevo`,
      formData
    );
  }

  getAllCourses(): Observable<CourseData> {
    return this.http.get<CourseData>(`${environment.API_URL}/api/cursos`);
  }

  getCourseByIdOrSlug(
    identificator: number | string
  ): Observable<CourseDetailResponse> {
    return this.http.get<CourseDetailResponse>(
      `${environment.API_URL}/api/curso/${identificator}`
    );
  }

  editCourse(formData: FormData, id: Number): Observable<CourseRequest> {
    return this.http.put<CourseRequest>(
      `${environment.API_URL}/api/curso/${id}/editar`,
      formData
    );
  }
  deleteCourse(id: number) {
    console.log(id);
    return this.http.delete<BackEndResponse>(
      `${environment.API_URL}/api/curso/${id}/borrar`
    );
  }
}
