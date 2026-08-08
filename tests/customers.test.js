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

  test('GET /customers/:id should return a single customer', async () => {
    const allCustomers = await request(app).get('/customers');

    const customerId = allCustomers.body[0]._id;

    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body._id).toBe(customerId);
  });
});