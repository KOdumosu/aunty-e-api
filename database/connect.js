const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    db = client.db('AuntyECafeDB');
  }
  return db;
}

module.exports = connectDB;