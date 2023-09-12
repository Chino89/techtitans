import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SetPasswordRequest, User } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecoveryService {
  constructor(private http: HttpClient) {}

  setPassword(credential: SetPasswordRequest, token: string): Observable<User> {
    return this.http.post<User>(
      `${environment.API_URL}/auth/recuperar-clave/${token}`,
      credential
    );
  }
}
