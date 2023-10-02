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

  createCategory(data: CategoryName): Observable<BackEndResponse> {
    return this.http.post<BackEndResponse>(
      `${environment.API_URL}/api/categoria/nuevo`,
       data 
    );
  }

  editCategory(id: Number, nombre: String): Observable<BackEndResponse> {
    return this.http.put<BackEndResponse>(
      `${environment.API_URL}/api/categoria/${id}/editar`,
      { nombre }
    );
  }

  deleteCategory(id: Number): Observable<BackEndResponse> {
    return this.http.delete<BackEndResponse>(
      `${environment.API_URL}/api/categoria/${id}/borrar`
    );
  }
}
