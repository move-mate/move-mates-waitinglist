import pg from 'pg';
const { Pool } = pg;

let pool;

export const getPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
};

export const setupDatabase = async () => {
  const pool = getPool();
  
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(50) CHECK (type IN ('customer', 'driver', 'business')) NOT NULL,
        province VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
};