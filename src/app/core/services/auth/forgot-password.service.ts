import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ForgotPasswordRequest, User } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {
    
  }
  
  recovery(credentials: ForgotPasswordRequest): Observable<User>{
    return this.http.post<User>(`${environment.API_URL}/auth/olvide-clave`, {
      email: credentials.email,
    })
  }
}