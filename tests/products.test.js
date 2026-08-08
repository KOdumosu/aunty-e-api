const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
  test('GET /products should return status 200', async () => {
    const response = await request(app).get('/products');

    expect(response.statusCode).toBe(200);
  });

  test('GET /products should return JSON', async () => {
    const response = await request(app).get('/products');

    expect(response.type).toBe('application/json');
  });

  test('GET /products should return an array', async () => {
    const response = await request(app).get('/products');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products/:id should return a single product', async () => {
  const allProducts = await request(app).get('/products');

  const productId = allProducts.body[0]._id;

  const response = await request(app).get(`/products/${productId}`);

  expect(response.statusCode).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body._id).toBe(productId);
});

});