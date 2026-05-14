const getDatabase = require('./_lib/mongodb');

module.exports = async (req, res) => {
  const db = await getDatabase();
  if (req.method === 'GET') {
    const users = await db.collection('users').find({}).toArray();
    const safeUsers = users.map(u => {
      const { password, _id, ...safe } = u;
      return safe;
    });
    return res.status(200).json(safeUsers);
  } else if (req.method === 'PUT') {
    const { uid, country, action = 'add' } = req.body;
    if (!uid || !country) {
      return res.status(400).json({ error: 'Missing uid or country' });
    }
    
    const updateQuery = action === 'remove' 
      ? { $pull: { visitedCountries: country } }
      : { $addToSet: { visitedCountries: country } };

    await db.collection('users').updateOne({ uid }, updateQuery);
    return res.status(200).json({ success: true, country, action });
  }
  res.status(405).send('Method Not Allowed');
};
