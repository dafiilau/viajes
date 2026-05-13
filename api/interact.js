const getDatabase = require('./_lib/mongodb');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const db = await getDatabase();
  const { action, userId, targetId } = req.body;

  if (!userId || !targetId) return res.status(400).json({ error: 'Missing parameters' });

  const users = db.collection('users');

  if (action === 'save') {
    const user = await users.findOne({ uid: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const savedTrips = user.savedTrips || [];
    const isSaved = savedTrips.includes(targetId);
    
    if (isSaved) {
      await users.updateOne({ uid: userId }, { $pull: { savedTrips: targetId } });
    } else {
      await users.updateOne({ uid: userId }, { $push: { savedTrips: targetId } });
    }
    
    return res.status(200).json({ saved: !isSaved });
    
  } else if (action === 'follow') {
    const user = await users.findOne({ uid: userId });
    const target = await users.findOne({ uid: targetId });
    if (!user || !target) return res.status(404).json({ error: 'User not found' });

    const following = user.following || [];
    const isFollowing = following.includes(targetId);

    if (isFollowing) {
      await users.updateOne({ uid: userId }, { $pull: { following: targetId } });
      await users.updateOne({ uid: targetId }, { $pull: { followers: userId } });
    } else {
      await users.updateOne({ uid: userId }, { $push: { following: targetId } });
      await users.updateOne({ uid: targetId }, { $push: { followers: userId } });
    }
    
    return res.status(200).json({ following: !isFollowing });
  }

  res.status(400).json({ error: 'Invalid action' });
};
