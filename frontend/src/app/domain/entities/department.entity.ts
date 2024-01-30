import { BaseResponse } from './base-response.entity';
import { Employee } from './employee.entity';

export interface DepartmentBase {
  name: string;
  desc: string;
}

export interface Department extends DepartmentBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentsFetchedResponse extends BaseResponse {
  departments: Department[];
}

export interface DepartmentAddedResponse extends BaseResponse {
  department: Department;
}

export interface DepartmentDeletedResponse extends BaseResponse {}

export interface MyDepartmentFetchResponse extends BaseResponse {
  department: Department;
  employees: Employee[];
}
