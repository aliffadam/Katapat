require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aliffadam:Adam31@aliff@cluster0.wr2zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client