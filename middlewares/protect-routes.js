const User = require('../models/user');

const protectRoutes = async (req, res, next) => {
  const { uid } = req.headers;
  const user = await User.findById(uid);
  if (req.path.startsWith('/admin') && !user.isAdmin) {
    return res.status(403).json({ message: 'unAuthorized Access' });
  }
  next();
};

module.exports = protectRoutes;
