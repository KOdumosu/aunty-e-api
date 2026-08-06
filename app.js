require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');
const supplierRoutes = require('./routes/suppliers');
const authRoutes = require('./routes/auth');

const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Welcome to Aunty E's Café & Mini Mart API");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);

app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not logged in'
    });
  }

  res.json(req.user);
});

module.exports = app;