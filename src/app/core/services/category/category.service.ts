import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CategoryDataResponse } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryDataResponse> {
    return this.http.get<CategoryDataResponse>(`${environment.API_URL}/api/categorias`);
  }
}
