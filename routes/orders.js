const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order Management API
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Returns all orders
 */
router.get('/', ordersController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Returns a single order
 *       404:
 *         description: Order not found
 */
router.get('/:id', ordersController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - productName
 *               - quantity
 *               - totalPrice
 *               - orderDate
 *               - paymentStatus
 *               - deliveryStatus
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               productName:
 *                 type: string
 *                 example: Chicken Shawarma
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               totalPrice:
 *                 type: number
 *                 example: 7000
 *               orderDate:
 *                 type: string
 *                 example: 2026-08-03
 *               paymentStatus:
 *                 type: string
 *                 example: Paid
 *               deliveryStatus:
 *                 type: string
 *                 example: Preparing
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', ordersController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               productName:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               totalPrice:
 *                 type: number
 *               orderDate:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *               deliveryStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put('/:id', ordersController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;