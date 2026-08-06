const { MongoClient } = require('mongodb');

afterAll(async () => {
  try {
    await MongoClient.close;
  } catch (err) {
    // ignore
  }
});