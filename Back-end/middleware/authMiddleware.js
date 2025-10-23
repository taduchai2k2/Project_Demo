const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.verifyToken = async (req, res, next) => {
  const header = req.header('Authorization') || req.header('authorization');
  const token = header ? header.replace('Bearer ', '') : null;
  if (!token) return res.status(401).json({ message: 'Không có token. Vui lòng đăng nhập.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Token không hợp lệ (user không tồn tại).' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn.' });
  }
};
