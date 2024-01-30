// import { newDb } from 'pg-mem';
// // import { EmailSender } from '../utils';
// import { Pool } from 'pg';
// import mongoose from 'mongoose';

// let pgMemDb: any;

// const pgConfig = {
//   user: process.env.POSTGRES_TEST_USER,
//   host: process.env.POSTGRES_TEST_HOST,
//   database: process.env.POSTGRES_TEST_DATABASE,
//   password: process.env.POSTGRES_TEST_PASSWORD,
//   port: process.env.POSTGRES_TEST_PORT,
// };

// beforeAll(async () => {
//   pgMemDb = newDb();
//   // Create a connection pool using pg-mem
//   const pgPool = new Pool({
//     ...pgConfig,
//     createConnection: pgMemDb.adapters.createTypeormConnection,
//   });

//   await pgPool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'); // Ensure UUID extension is available
//   await pgPool.query('CREATE TABLE IF NOT EXISTS your_table_name (id uuid DEFAULT uuid_generate_v4(), name varchar(255));'); // Replace with your actual table structure

//   // Use pg-mem as the adapter for TypeORM
//   await pgPool.query(pgMemDb.adapters.createTypeormDatabaseSql(pgConfig.database));

//   // Use the real TypeORM connection to connect to pg-mem
//   await mongoose.connect(pgConfig);
// });

// beforeEach(async () => {
//   // Clear all data from the table before each test
//   await pgMemDb.synchronize();

//   //   EmailSender.resetEmailSenderInstance();
//   jest.clearAllMocks();
// });

// afterAll(async () => {
//   // Close the connection pool
//   await mongoose.connection.close();
// });
