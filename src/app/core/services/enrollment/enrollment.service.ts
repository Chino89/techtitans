import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EnrollmentResponse } from '../../interfaces/enrollmentInterfaces';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  courseEnrollment(param: string, id: number): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(`${environment.API_URL}/api/asistencia/inscribirme/${param}`, {id} )
    }
}