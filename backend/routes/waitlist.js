import express from 'express';
import { body, validationResult } from 'express-validator';
import { addToWaitlist } from '../services/waitlist.js';

export const waitlistRouter = express.Router();

const validateWaitlist = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('surname').trim().notEmpty().withMessage('Surname is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('userType').isIn(['customer', 'driver', 'business']).withMessage('Invalid user type'),
  body('province').trim().notEmpty().withMessage('Province is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
];

waitlistRouter.post('/', validateWaitlist, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await addToWaitlist(req.body);
    res.status(201).json({ message: 'Added to waitlist', data: result });
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'Email already exists in waitlist' });
    } else {
      console.error('Error adding to waitlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});