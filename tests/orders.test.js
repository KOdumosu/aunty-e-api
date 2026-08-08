const request = require('supertest');
const app = require('../app');

describe('Orders API', () => {
  test('GET /orders should return status 200', async () => {
    const response = await request(app).get('/orders');

    expect(response.statusCode).toBe(200);
  });

  test('GET /orders should return JSON', async () => {
    const response = await request(app).get('/orders');

    expect(response.type).toBe('application/json');
  });

  test('GET /orders should return an array', async () => {
    const response = await request(app).get('/orders');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /orders/:id should return a single order', async () => {
  const allOrders = await request(app).get('/orders');

  const orderId = allOrders.body[0]._id;

  const response = await request(app).get(`/orders/${orderId}`);

  expect(response.statusCode).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body._id).toBe(orderId);
});

});