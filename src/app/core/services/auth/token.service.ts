import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private route: ActivatedRoute) {}

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
}
