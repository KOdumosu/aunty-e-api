const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer Management API
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Returns all customers
 */
router.get('/', customersController.getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Returns a single customer
 *       404:
 *         description: Customer not found
 */
router.get('/:id', customersController.getCustomerById);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phone
 *               - email
 *               - address
 *               - loyaltyPoints
 *               - membershipLevel
 *               - status
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Mary Johnson
 *               phone:
 *                 type: string
 *                 example: "+2348012345678"
 *               email:
 *                 type: string
 *                 example: mary@example.com
 *               address:
 *                 type: string
 *                 example: Ikorodu, Lagos
 *               loyaltyPoints:
 *                 type: integer
 *                 example: 150
 *               membershipLevel:
 *                 type: string
 *                 example: Gold
 *               status:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', customersController.createCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               loyaltyPoints:
 *                 type: integer
 *               membershipLevel:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
router.put('/:id', customersController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;