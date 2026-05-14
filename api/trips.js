const getDatabase = require('./_lib/mongodb');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const db = await getDatabase();
  const collection = db.collection('trips');

  if (req.method === 'GET') {
    // Return all trips
    const trips = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(trips);
  } else if (req.method === 'POST') {
    const tripData = req.body;
    const newTrip = {
      ...tripData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    await collection.insertOne(newTrip);

    if (tripData.userId && tripData.country) {
      await db.collection('users').updateOne(
        { uid: tripData.userId },
        { $addToSet: { visitedCountries: tripData.country } }
      );
    }

    return res.status(201).json(newTrip);
  }

  res.status(405).send('Method Not Allowed');
};
