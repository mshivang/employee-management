import dotenv from 'dotenv';
import app from './app';
import colors from 'colors';
import { Pool } from 'pg';

const parsedNodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: parsedNodeEnv === 'development' ? '.env.local' : '.env.production',
});

// server
const port = process.env.PORT || 8090;

const pool = new Pool({
  user: process.env.POSTGRES_USER!,
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DB!,
  password: process.env.POSTGRES_PASSWORD!,
  port: parseInt(process.env.POSTGRES_PORT!),
});

app.listen(port, async () => {
  console.log(colors.yellow(`Department Service running on port ${port}`));
});

export { pool };
