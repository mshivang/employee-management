import { BaseResponse } from './base-response.entity';
import { Department } from './department.entity';
import { User } from './user.entity';

export interface EmployeeBase {
  user: User | null | number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  altPhone: string;
  aadhar: string;
  pan: string;
  currAddress: string;
  permAddress: string;
  department: string | Department | null;
  manager: string | Employee | null;
}

export interface Employee extends EmployeeBase {
  eid: string;
  department: Department | null;
  manager: Employee | null;
}

export interface EmployeesFetchedResponse extends BaseResponse {
  employees: Employee[];
}

export interface EmployeeAddedResponse extends BaseResponse {
  employee: Employee;
}

export interface EmployeeUpdatedResponse extends BaseResponse {
  employee: Employee;
}

export interface EmployeeDeletedResponse extends BaseResponse {}
