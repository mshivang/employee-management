import { BaseResponse } from './base-response.entity';
import { Department } from './department.entity';
import { User } from './user.entity';

export interface EmployeeBase {
  user: User | null;
  password: string;
  fullName: string;
  phone: string;
  altPhone: string;
  aadhar: string;
  pan: string;
  currAddress: string;
  permAddress: string;
  department: Department | null;
  manager: User | null;
}

export interface Employee extends EmployeeBase {
  eid: string;
}

export interface EmployeesFetchedResponse extends BaseResponse {
  employees: Employee[];
}
