const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');

// GET all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const db = await connectDB();

    const suppliers = await db
      .collection('suppliers')
      .find()
      .toArray();

    res.status(200).json(suppliers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET supplier by ID
exports.getSupplierById = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid supplier ID'
      });
    }

    const db = await connectDB();

    const supplier = await db.collection('suppliers').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!supplier) {
      return res.status(404).json({
        message: 'Supplier not found'
      });
    }

    res.status(200).json(supplier);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// CREATE supplier
exports.createSupplier = async (req, res) => {
  try {

    const {
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      productsSupplied,
      status
    } = req.body;


    if (
      !supplierName ||
      !contactPerson ||
      !phone ||
      !email ||
      !address ||
      !productsSupplied ||
      !status
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }


    const db = await connectDB();

    const result = await db.collection('suppliers').insertOne({
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      productsSupplied,
      status
    });


    res.status(201).json({
      message: 'Supplier created successfully',
      id: result.insertedId
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE supplier
exports.updateSupplier = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid supplier ID'
      });
    }


    const db = await connectDB();


    const allowedFields = [
      'supplierName',
      'contactPerson',
      'phone',
      'email',
      'address',
      'productsSupplied',
      'status'
    ];


    const updateData = {};


    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });


    const result = await db.collection('suppliers').updateOne(
      {
        _id: new ObjectId(req.params.id)
      },
      {
        $set: updateData
      }
    );


    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Supplier not found'
      });
    }


    res.status(200).json({
      message: 'Supplier updated successfully'
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE supplier
exports.deleteSupplier = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid supplier ID'
      });
    }


    const db = await connectDB();


    const result = await db.collection('suppliers').deleteOne({
      _id: new ObjectId(req.params.id)
    });


    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Supplier not found'
      });
    }


    res.status(200).json({
      message: 'Supplier deleted successfully'
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};