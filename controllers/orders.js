const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all orders
exports.getAllOrders = async (req, res) => {
  try {
    const db = await connectDB();

    const orders = await db
      .collection('orders')
      .find()
      .toArray();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET order by ID
exports.getOrderById = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid order ID'
      });
    }

    const db = await connectDB();

    const order = await db.collection('orders').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE order
exports.createOrder = async (req, res) => {
  try {

    const {
      customerName,
      productName,
      quantity,
      totalPrice,
      orderDate,
      paymentStatus,
      deliveryStatus
    } = req.body;

    if (
      !customerName ||
      !productName ||
      quantity == null ||
      totalPrice == null ||
      !orderDate ||
      !paymentStatus ||
      !deliveryStatus
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const db = await connectDB();

    const result = await db.collection('orders').insertOne({
      customerName,
      productName,
      quantity,
      totalPrice,
      orderDate,
      paymentStatus,
      deliveryStatus
    });

    res.status(201).json({
      message: 'Order created successfully',
      id: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE order
exports.updateOrder = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid order ID'
      });
    }

    const db = await connectDB();

    const allowedFields = [
      'customerName',
      'productName',
      'quantity',
      'totalPrice',
      'orderDate',
      'paymentStatus',
      'deliveryStatus'
    ];

    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const result = await db.collection('orders').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.status(200).json({
      message: 'Order updated successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE order
exports.deleteOrder = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid order ID'
      });
    }

    const db = await connectDB();

    const result = await db.collection('orders').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.status(200).json({
      message: 'Order deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};