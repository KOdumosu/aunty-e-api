const request = require('supertest');
const app = require('../app');

describe('Suppliers API', () => {
  test('GET /suppliers should return status 200', async () => {
    const response = await request(app).get('/suppliers');

    expect(response.statusCode).toBe(200);
  });

  test('GET /suppliers should return JSON', async () => {
    const response = await request(app).get('/suppliers');

    expect(response.type).toBe('application/json');
  });

  test('GET /suppliers should return an array', async () => {
    const response = await request(app).get('/suppliers');

    expect(Array.isArray(response.body)).toBe(true);
  });
});