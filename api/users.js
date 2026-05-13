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
  }
  res.status(405).send('Method Not Allowed');
};
