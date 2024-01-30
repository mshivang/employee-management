import { BaseResponse } from './base-response.entity';

export interface EmployeeBase {
  uid: string;
  fullName: string;
  phone: string;
  altPhone: string;
  aadhar: string;
  pan: string;
  currAddress: string;
  permAddress: string;
  department_id: string | null;
  manager_id: string | null;
}

export interface Employee extends EmployeeBase {
  eid: string;
}

export interface EmployeesFetchedResponse extends BaseResponse {
  employees: Employee[];
}
