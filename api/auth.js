const getDatabase = require('./_lib/mongodb');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const db = await getDatabase();
  const collection = db.collection('users');

  if (req.method === 'POST') {
    const { action, email, password, username, avatar } = req.body;
    
    if (action === 'register') {
      const existing = await collection.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(400).json({ error: 'auth/email-already-in-use' });
      
      const user = {
        uid: crypto.randomUUID(),
        username,
        email: email.toLowerCase(),
        password,
        avatar,
        followers: [],
        following: [],
        savedTrips: [],
        visitedCountries: []
      };
      await collection.insertOne(user);
      return res.status(200).json(user);
    } else if (action === 'login') {
      const user = await collection.findOne({ email: email.toLowerCase(), password });
      if (!user) return res.status(400).json({ error: 'auth/invalid-credential' });
      return res.status(200).json(user);
    }
  } else if (req.method === 'GET') {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: 'Missing uid' });
    const user = await collection.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  }
  
  res.status(405).send('Method Not Allowed');
};
