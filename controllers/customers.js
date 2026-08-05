const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const db = await connectDB();

    const customers = await db
      .collection('customers')
      .find()
      .toArray();

    res.status(200).json(customers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET customer by ID
exports.getCustomerById = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid customer ID'
      });
    }

    const db = await connectDB();

    const customer = await db.collection('customers').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.status(200).json(customer);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE customer
exports.createCustomer = async (req, res) => {
  try {

    const {
      customerName,
      phone,
      email,
      address,
      loyaltyPoints,
      membershipLevel,
      status
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !email ||
      !address ||
      loyaltyPoints == null ||
      !membershipLevel ||
      !status
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const db = await connectDB();

    const result = await db.collection('customers').insertOne({
      customerName,
      phone,
      email,
      address,
      loyaltyPoints,
      membershipLevel,
      status
    });

    res.status(201).json({
      message: 'Customer created successfully',
      id: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE customer
exports.updateCustomer = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid customer ID'
      });
    }

    const db = await connectDB();

    const allowedFields = [
      'customerName',
      'phone',
      'email',
      'address',
      'loyaltyPoints',
      'membershipLevel',
      'status'
    ];

    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const result = await db.collection('customers').updateOne(
      {
        _id: new ObjectId(req.params.id)
      },
      {
        $set: updateData
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      message: 'Customer updated successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid customer ID'
      });
    }

    const db = await connectDB();

    const result = await db.collection('customers').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      message: 'Customer deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};