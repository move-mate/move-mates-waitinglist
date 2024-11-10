import { getPool } from '../db/setup.js';

export const addToWaitlist = async ({ name, surname, email, userType, province, city }) => {
  const pool = getPool();
  
  const result = await pool.query(
    `INSERT INTO waitlist (name, surname, email, user_type, province, city)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, surname, email, userType, province, city]
  );
  
  return result.rows[0];
};