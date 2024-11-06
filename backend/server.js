import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Create or update the waitlist table with additional fields
pool.query(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_type VARCHAR(50) CHECK (user_type IN ('customer', 'driver')) NOT NULL,
    province VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`);

// Handle POST requests to add a user to the waitlist
app.post('/api/waitlist', async (req, res) => {
  const { name, surname, email, userType, province, city } = req.body;
  
  // Validate required fields
  if (!name || !surname || !email || !userType || !province || !city) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (userType !== 'customer' && userType !== 'driver') {
    return res.status(400).json({ error: 'Invalid user type. Must be either customer or driver' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO waitlist (name, surname, email, user_type, province, city)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, surname, email, userType, province, city]
    );
    res.status(201).json({ message: 'Added to waitlist', data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') { // unique_violation error code for email
      res.status(409).json({ error: 'Email already exists in waitlist' });
    } else {
      console.error('Error adding to waitlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
