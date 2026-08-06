const request = require('supertest');
const app = require('../app');

describe('Customers API', () => {
  test('GET /customers should return status 200', async () => {
    const response = await request(app).get('/customers');

    expect(response.statusCode).toBe(200);
  });

  test('GET /customers should return JSON', async () => {
    const response = await request(app).get('/customers');

    expect(response.type).toBe('application/json');
  });

  test('GET /customers should return an array', async () => {
    const response = await request(app).get('/customers');

    expect(Array.isArray(response.body)).toBe(true);
  });
});