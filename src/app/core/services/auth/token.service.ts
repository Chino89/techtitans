import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  checkToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getParamToken() {
    const token = this.route.snapshot.paramMap.get('token');
    return token;
  }

  refreshToken() {
    const oldToken = this.checkToken();
    return this.http.post(
      `${environment.API_URL}/auth/refresh-token`,
      oldToken
    );
  }
}
