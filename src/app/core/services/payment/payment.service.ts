import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersPayment } from '../../interfaces/paymentInterfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<UsersPayment> {
    return this.http.get<UsersPayment>(`${environment.API_URL}/api/pagos`);
  }
  getPaymentByToken(param: number | string): Observable<UsersPayment> {
    return this.http.get<UsersPayment>(
      `${environment.API_URL}/api/pago/${param}`
    );
  }
}
