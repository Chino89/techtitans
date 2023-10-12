import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UsersPayment,
  mensajeResponse,
  pagoDto,
} from '../../interfaces/paymentInterfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  getAllPayments(): Observable<UsersPayment> {
    return this.http.get<UsersPayment>(`${this.url}/api/pagos`);
  }
  getPaymentByToken(param: number | string): Observable<UsersPayment> {
    return this.http.get<UsersPayment>(`${this.url}/api/pago/${param}`);
  }

  payCourse(tokenPago: string, pago: pagoDto): Observable<mensajeResponse> {
    return this.http.put<mensajeResponse>(
      `${this.url}/api/pago/cobrar/inscripcion/${tokenPago}`,
      pago
    );
  }
}
