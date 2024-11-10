import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { waitlistRouter } from './routes/waitlist.js';
import { setupDatabase } from './db/setup.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Setup database
await setupDatabase();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;