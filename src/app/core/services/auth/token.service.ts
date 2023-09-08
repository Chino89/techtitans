import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  checkToken() {
    const token = localStorage.getItem('token');
    return token
  }

  removeToken() {
    localStorage.removeItem('token');
  }

}
