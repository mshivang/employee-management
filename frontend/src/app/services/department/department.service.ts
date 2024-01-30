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

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  fetchDepartments$(): Observable<DepartmentsFetchedResponse> {
    return this.http.get<DepartmentsFetchedResponse>(
      'http://127.0.0.1:8000/api/departments/',
      {
        withCredentials: true,
      }
    );
  }

  addDepartment$(
    department: DepartmentBase
  ): Observable<DepartmentAddedResponse> {
    return this.http.post<DepartmentAddedResponse>(
      'http://127.0.0.1:8000/api/departments/',
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
      `http://127.0.0.1:8000/api/departments/${id}`,
      department,
      {
        withCredentials: true,
      }
    )
  }

  deleteDepartment$(id: string): Observable<DepartmentDeletedResponse> {
    return this.http.delete<DepartmentDeletedResponse>(
      `http://127.0.0.1:8000/api/departments/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  fetchMyDepartment$(): Observable<MyDepartmentFetchResponse> {
    return this.http.get<MyDepartmentFetchResponse>(
      `http://127.0.0.1:8000/api/mydepartment`,
      {
        withCredentials: true,
      }
    );
  }
}
