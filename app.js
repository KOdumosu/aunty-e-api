require('dotenv').config();

const express = require('express');
const connectDB = require('./database/connect');
const { swaggerUi, swaggerSpec } = require('./swagger');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("Welcome to Aunty E's Café & Mini Mart API");
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error(err);
  });