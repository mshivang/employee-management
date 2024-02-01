import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DepartmentAddedResponse,
  DepartmentBase,
  DepartmentDeletedResponse,
  DepartmentsFetchedResponse,
  MyDepartmentFetchResponse,
} from '../../domain/entities';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  fetchDepartments$(): Observable<DepartmentsFetchedResponse> {
    return this.http.get<DepartmentsFetchedResponse>(
      `${environment.baseUrl}/api/departments/`,
      {
        withCredentials: true,
      }
    );
  }

  addDepartment$(
    department: DepartmentBase
  ): Observable<DepartmentAddedResponse> {
    return this.http.post<DepartmentAddedResponse>(
      `${environment.baseUrl}/api/departments/`,
      department,
      {
        withCredentials: true,
      }
    );
  }

  editDepartment$(
    id: string,
    department: DepartmentBase
  ): Observable<DepartmentAddedResponse> {
    return this.http.patch<DepartmentAddedResponse>(
      `${environment.baseUrl}/api/departments/${id}`,
      department,
      {
        withCredentials: true,
      }
    );
  }

  deleteDepartment$(id: string): Observable<DepartmentDeletedResponse> {
    return this.http.delete<DepartmentDeletedResponse>(
      `${environment.baseUrl}/api/departments/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  fetchMyDepartment$(): Observable<MyDepartmentFetchResponse> {
    return this.http.get<MyDepartmentFetchResponse>(
      `${environment.baseUrl}/api/mydepartment/`,
      {
        withCredentials: true,
      }
    );
  }
}
