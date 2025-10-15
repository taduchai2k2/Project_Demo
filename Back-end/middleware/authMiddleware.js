const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // chứa id, email,...
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ.' });
  }
};

module.exports = authMiddleware;
