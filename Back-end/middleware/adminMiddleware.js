exports.isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Không có user' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Chỉ admin mới thực hiện được hành động này.' });
  next();
};
