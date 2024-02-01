import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EmployeeAddedResponse,
  EmployeeBase,
  EmployeeDeletedResponse,
  EmployeeUpdatedResponse,
  EmployeesFetchedResponse,
} from '../../domain/entities';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  fetchEmployees$(): Observable<EmployeesFetchedResponse> {
    return this.http.get<EmployeesFetchedResponse>(
      `${environment.baseUrl}/api/employees/`,
      {
        withCredentials: true,
      }
    );
  }

  addEmployee$(employee: EmployeeBase): Observable<EmployeeAddedResponse> {
    return this.http.post<EmployeeAddedResponse>(
      `${environment.baseUrl}/api/employees/`,
      employee,
      {
        withCredentials: true,
      }
    );
  }

  editEmployee$(
    id: string,
    employee: EmployeeBase
  ): Observable<EmployeeUpdatedResponse> {
    return this.http.patch<EmployeeUpdatedResponse>(
      `${environment.baseUrl}/api/employees/${id}`,
      employee,
      {
        withCredentials: true,
      }
    );
  }

  deleteEmployee$(id: string): Observable<EmployeeDeletedResponse> {
    return this.http.delete<EmployeeDeletedResponse>(
      `${environment.baseUrl}/api/employees/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
