import express from 'express';
import { departmentController } from '../controllers';
import { DEPARTMENT_EMPLOYEES } from './route-defs';

const departmentView = express.Router();

//Fetching a department
departmentView.get(DEPARTMENT_EMPLOYEES, departmentController.fetchEmployee);

export { departmentView };
