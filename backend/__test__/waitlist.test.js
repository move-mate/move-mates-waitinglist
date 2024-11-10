import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../server.js';
import { getPool } from '../db/setup.js';

const request = supertest(app);

describe('Waitlist API', () => {
  beforeAll(async () => {
    const pool = getPool();
    await pool.query('DELETE FROM waitlist');
  });

  afterAll(async () => {
    const pool = getPool();
    await pool.query('DELETE FROM waitlist');
    await pool.end();
  });

  it('should add a new user to waitlist', async () => {
    const userData = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      userType: 'customer',
      province: 'Western Cape',
      city: 'Cape Town'
    };

    const response = await request
      .post('/api/waitlist')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Added to waitlist');
    expect(response.body.data.email).toBe(userData.email);
  });

  it('should prevent duplicate emails', async () => {
    const userData = {
      name: 'Jane',
      surname: 'Doe',
      email: 'john@example.com',
      userType: 'customer',
      province: 'Western Cape',
      city: 'Cape Town'
    };

    const response = await request
      .post('/api/waitlist')
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Email already exists in waitlist');
  });

  it('should validate required fields', async () => {
    const response = await request
      .post('/api/waitlist')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should validate user type', async () => {
    const userData = {
      name: 'John',
      surname: 'Doe',
      email: 'john2@example.com',
      userType: 'invalid',
      province: 'Western Cape',
      city: 'Cape Town'
    };

    const response = await request
      .post('/api/waitlist')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Invalid user type');
  });
});