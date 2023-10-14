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
  url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  courseEnrollment(param: string, id: number): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(
      `${this.url}/api/asistencia/inscribirme/${param}`,
      { id }
    );
  }

  getAttendances(): Observable<UserEnrollment> {
    return this.http.get<UserEnrollment>(
      `${this.url}/api/asistencias`
    );
  }

  getMyCourses(): Observable<UserEnrollment> {
    return this.http.get<UserEnrollment>(
      `${this.url}/api/asistencias/mis-cursos`
    );
  }

  getMyCoursesByCode(codigoInscripcion: string): Observable<attendanceData> {
    return this.http.get<attendanceData>(
      `${this.url}/api/asistencias/mis-cursos/${codigoInscripcion}`
    );
    }

  markAttendance(codigoInscripcion: string, data: attendanceDto): Observable<mensajeResponse>{
    return this.http.put<mensajeResponse>(
      `${this.url}/api/asistencia/marcar/${codigoInscripcion}`,
      data
    );
  }

  getQRCodePay(tokenPago: string): Observable<Blob>{
    return this.http.get(
      `${this.url}/api/asistencia/generar-qr/${tokenPago}`, { responseType: 'blob' }
    );
  }

  getCertificate(codigoInscripcion: string): Observable<Blob>{
    return this.http.get(
      `${this.url}/api/asistencias/mis-cursos/certificado/${codigoInscripcion}`, { responseType: 'blob' }
    );
  }
}
