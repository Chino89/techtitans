import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  CategoryDataResponse,
  CategoryName,
} from '../../interfaces/categoryInterfaces';
import { BackEndResponse } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryDataResponse> {
    return this.http.get<CategoryDataResponse>(
      `${environment.API_URL}/api/categorias`
    );
  }

  getCategory(id: Number): Observable<CategoryDataResponse> {
    return this.http.get<CategoryDataResponse>(
      `${environment.API_URL}/api/categoria/${id}`
    );
  }

  createCategory(): Observable<BackEndResponse> {
    return this.http.get<BackEndResponse>(
      `${environment.API_URL}/api/categoria/nuevo`
    );
  }

  editCategory(id: Number, data:CategoryName): Observable<BackEndResponse> {
    return this.http.put<BackEndResponse>(
      `${environment.API_URL}/api/categoria/${id}/editar`, data
    );
  }

  deleteCategory(id: Number): Observable<BackEndResponse> {
    return this.http.delete<BackEndResponse>(
      `${environment.API_URL}/api/categoria/${id}/borrar`
    );
  }
}
