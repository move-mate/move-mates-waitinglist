import { getPool } from '../db/setup.js';

export const addToWaitlist = async ({ name, email, type, province, city }) => {
  const pool = getPool();
  
  const result = await pool.query(
    `INSERT INTO waitlist (name, email, type, province, city)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, type, province, city]
  );
  
  return result.rows[0];
};