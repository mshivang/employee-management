import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middleware';
import { departmentView } from './views';

const app = express();
app.use(express.json());

// Routes - Ensure that this comes after middlewares
app.use(departmentView);

// Error handling middleware
app.use(errorHandler);

export default app;
