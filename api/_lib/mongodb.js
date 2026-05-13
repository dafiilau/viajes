const { MongoClient } = require('mongodb');
const { seedUsers, seedTrips } = require('./seed');

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

async function getDatabase() {
  const client = await clientPromise;
  const db = client.db('viajes_reales');

  // Automatic Seeding
  const usersCount = await db.collection('users').countDocuments();
  if (usersCount === 0) {
    console.log('Seeding the database with initial users and trips...');
    await db.collection('users').insertMany(seedUsers);
    await db.collection('trips').insertMany(seedTrips);
    console.log('Seeding complete!');
  }

  return db;
}

module.exports = getDatabase;
