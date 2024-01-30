import request from 'supertest';
import app from '../app';
import { pool } from '..';

jest.mock('..', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('departmentController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchEmployee', () => {
    it('should return employees when a valid department id is provided', async () => {
      const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
        callback(null, [
          { id: 1, name: 'Employee1' },
          { id: 2, name: 'Employee2' },
        ]);
      });

      pool.query = mockQuery;

      const response = await request(app).get('/api/department/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        employees: [
          { id: 1, name: 'Employee1' },
          { id: 2, name: 'Employee2' },
        ],
      });
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM employees_employee WHERE department_id = $1', ['1'], expect.any(Function));
    });

    it('should handle invalid input and throw InvalidInput error', async () => {
      const response = await request(app).get('/api/department/random');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid input' });
    });

    it('should handle DepartmentNotFound error', async () => {
      const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
        callback(new Error('Department not found'));
      });

      pool.query = mockQuery;

      const response = await request(app).get('/api/depatment/random-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Department not found' });
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM employees_employee WHERE department_id = $1', ['1'], expect.any(Function));
    });
  });
});
