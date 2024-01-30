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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  fetchEmployees$(): Observable<EmployeesFetchedResponse> {
    return this.http.get<EmployeesFetchedResponse>(
      'http://127.0.0.1:8000/api/employees/',
      {
        withCredentials: true,
      }
    );
  }

  addEmployee$(employee: EmployeeBase): Observable<EmployeeAddedResponse> {
    return this.http.post<EmployeeAddedResponse>(
      'http://127.0.0.1:8000/api/employees/',
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
      `http://127.0.0.1:8000/api/employees/${id}`,
      employee,
      {
        withCredentials: true,
      }
    );
  }

  deleteEmployee$(id: string): Observable<EmployeeDeletedResponse> {
    return this.http.delete<EmployeeDeletedResponse>(
      `http://127.0.0.1:8000/api/employees/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
