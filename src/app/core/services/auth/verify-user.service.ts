import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserService {

  constructor(private http: HttpClient) {}

  verifyUser(token: string) {
    return this.http.get(`${environment.API_URL}/auth/verificar/${token}`)
  }

}
