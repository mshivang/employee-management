import dotenv from 'dotenv';
import app from './app';
import colors from 'colors';
import { Pool } from 'pg';

const parsedNodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: parsedNodeEnv === 'development' ? '.env.local' : '.env',
});

// server
const port = process.env.PORT || 8090;

const pool = new Pool({
  user: process.env.POSTGRES_USER!,
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DB!,
  password: process.env.POSTGRES_PASSWORD!,
  port: parseInt(process.env.POSTGRES_PORT!),
  ssl: parsedNodeEnv === 'production',
});

pool.on('connect', () => {
  console.log(colors.green('Connected to PostgreSQL database'));
});

pool.on('error', (err: any) => {
  console.error(colors.red('Error connecting to PostgreSQL database:'), err);
  process.exit(1); // Exit the process on connection error
});

try {
  console.log(colors.green('Database connected successfully!'));
} catch (error: any) {
  console.error(colors.red('Something went wrong'), error);
}

app.listen(port, async () => {
  console.log(colors.yellow(`Department Service running on port ${port}`));
});

export { pool };
