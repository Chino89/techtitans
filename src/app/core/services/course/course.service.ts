import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackEndResponse } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../../interfaces/asistencia';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  marcarAsistencia(id: number, idAlumno: number, fechaAsistencia: Date): Observable<Asistencia> {
    const data: Asistencia = {
      idAlumno,
      fechaAsistencia,
      asistio: true,
    };
    return this.http.post<Asistencia>(
      `${environment.API_URL}/api/cursos/${id}/asistencias`,
      data
    ).pipe(
      catchError(error => {
            console.error('Error en la solicitud de asistencia:', error);
        return throwError('Error en la solicitud de asistencia');
      })
    );
  }

  cerrarCurso(id: number): Observable<BackEndResponse> {
    return this.http.put<BackEndResponse>(
      `${environment.API_URL}/api/cursos/${id}/cerrar`, {}
    ).pipe(
      catchError(error => {
         console.error('Error al cerrar el curso:', error);
        return throwError('Error al cerrar el curso');
      })
    );
  }

  enviarDiploma(id: number, idAlumno: number): Observable<BackEndResponse> {
    return this.http.post<BackEndResponse>(
      `${environment.API_URL}/api/cursos/${id}/diplomas`,
      { idAlumno }
    ).pipe(
      catchError(error => {
         console.error('Error al enviar el diploma:', error);
        return throwError('Error al enviar el diploma');
      })
    );
  }

 
}


