import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  EnrollmentResponse,
  UserEnrollment,
  attendanceDto,
} from '../../interfaces/enrollmentInterfaces';
import { mensajeResponse } from '../../interfaces/paymentInterfaces';
import { attendanceData, attendanceResponse } from '../../interfaces/attendanceInterface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  courseEnrollment(param: string, id: number): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(
      `${environment.API_URL}/api/asistencia/inscribirme/${param}`,
      { id }
    );
  }

  getAttendances(): Observable<UserEnrollment> {
    return this.http.get<UserEnrollment>(
      `${environment.API_URL}/api/asistencias`
    );
  }

  getMyCourses(): Observable<UserEnrollment> {
    return this.http.get<UserEnrollment>(
      `${environment.API_URL}/api/asistencias/mis-cursos`
    );
  }

  getMyCoursesByCode(codigoInscripcion: string): Observable<attendanceData> {
    return this.http.get<attendanceData>(
      `${environment.API_URL}/api/asistencias/mis-cursos/${codigoInscripcion}`
    );
  }

  getCertification(inscriptionCode: string): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL}/api/asistencias/mis-cursos/certificado/${inscriptionCode}`
    );
  }

  markAttendance(codigoInscripcion: string, data: attendanceDto): Observable<mensajeResponse>{
    return this.http.put<mensajeResponse>(
      `${environment.API_URL}/api/asistencia/marcar/${codigoInscripcion}`,
      data
    );
  }
}
