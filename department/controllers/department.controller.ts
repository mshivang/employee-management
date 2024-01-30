import { Request, Response } from 'express';
import { Employee, EmployeesFetchedResponse } from '../domain/entity';
import { EmployeesFetched } from '../events';
import { FieldValidationError, validationResult } from 'express-validator';
import { InvalidInput, DepartmentNotFound } from '../errors';
import { pool } from '..';

const departmentController = {
  /**
   * Fetch employee by department id.
   * @param {Request<{}, EmployeesFetchedResponse>} req - Request Body
   * @param {Response<EmployeesFetchedResponse>} res - Response Body
   * @returns {void}
   */
  fetchEmployee: async (req: Request<{ id: string }, EmployeesFetchedResponse>, res: Response<EmployeesFetchedResponse>) => {
    const errors = validationResult(req).array() as FieldValidationError[];
    const id = req.params.id;

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    try {
      const queryResult = await pool.query<Employee>('SELECT * FROM employees_employee WHERE department_id = $1', [id]);
      const employeesFetched = new EmployeesFetched(queryResult);
      return res.status(employeesFetched.getStatusCode()).send(employeesFetched.serializeRest());
    } catch (error) {
      throw new DepartmentNotFound();
    }
  },
};

export { departmentController };
