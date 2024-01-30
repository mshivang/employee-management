import { QueryResult } from 'pg';
import { Employee, EmployeesFetchedResponse } from '../domain/entity';
import { BaseEmployeeEvent } from './base-employee-event';

export class EmployeesFetched extends BaseEmployeeEvent<EmployeesFetchedResponse> {
  private statusCode = 200;
  private employees: Employee[];
  private defaultMessage = 'Employees fetched succesfully';

  constructor(employees: QueryResult<Employee>) {
    super();
    this.employees = employees.rows;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): EmployeesFetchedResponse {
    return {
      success: true,
      message: this.defaultMessage,
      employees: this.employees,
    };
  }
}
