const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier Management API
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Returns all suppliers
 */
router.get('/', suppliersController.getAllSuppliers);


/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Returns a supplier
 *       404:
 *         description: Supplier not found
 */
router.get('/:id', suppliersController.getSupplierById);


/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierName
 *               - contactPerson
 *               - phone
 *               - email
 *               - address
 *               - productsSupplied
 *               - status
 *             properties:
 *               supplierName:
 *                 type: string
 *                 example: Fresh Foods Ltd
 *               contactPerson:
 *                 type: string
 *                 example: Adewale James
 *               phone:
 *                 type: string
 *                 example: "+2348098765432"
 *               email:
 *                 type: string
 *                 example: sales@freshfoods.com
 *               address:
 *                 type: string
 *                 example: Lagos
 *               productsSupplied:
 *                 type: string
 *                 example: Chicken, Sausages, Drinks
 *               status:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', suppliersController.createSupplier);


/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierName:
 *                 type: string
 *               contactPerson:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               productsSupplied:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 */
router.put('/:id', suppliersController.updateSupplier);


/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 */
router.delete('/:id', suppliersController.deleteSupplier);


module.exports = router;