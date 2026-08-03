const connectDB = require('../database/connect');
const { ObjectId } = require('mongodb');


// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const db = await connectDB();

    const products = await db
      .collection('products')
      .find()
      .toArray();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET product by ID
exports.getProductById = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }

    const db = await connectDB();

    const product = await db.collection('products').findOne({
      _id: new ObjectId(req.params.id)
    });


    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }


    res.status(200).json(product);


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// CREATE product
exports.createProduct = async (req, res) => {
  try {

    const {
      productName,
      category,
      price,
      quantity,
      description,
      supplier,
      status
    } = req.body;


    if (
      !productName ||
      !category ||
      price == null ||
      quantity == null ||
      !description ||
      !supplier ||
      !status
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }


    const db = await connectDB();


    const result = await db.collection('products').insertOne({
      productName,
      category,
      price,
      quantity,
      description,
      supplier,
      status
    });


    res.status(201).json({
      message: 'Product created successfully',
      id: result.insertedId
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// UPDATE product
exports.updateProduct = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }


    const db = await connectDB();


    const allowedFields = [
      'productName',
      'category',
      'price',
      'quantity',
      'description',
      'supplier',
      'status'
    ];


    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });


    const result = await db.collection('products').updateOne(
      {
        _id: new ObjectId(req.params.id)
      },
      {
        $set: updateData
      }
    );


    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }


    res.status(200).json({
      message: 'Product updated successfully'
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE product
exports.deleteProduct = async (req, res) => {
  try {

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }


    const db = await connectDB();


    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(req.params.id)
    });


    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }


    res.status(200).json({
      message: 'Product deleted successfully'
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};