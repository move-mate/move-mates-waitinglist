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

// Create waitlist table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO waitlist (email) VALUES ($1) RETURNING *',
      [email]
    );
    res.status(201).json({ message: 'Added to waitlist', data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') { // unique_violation error code
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