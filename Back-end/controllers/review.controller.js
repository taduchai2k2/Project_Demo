const Product = require('../models/product.model');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // check user already reviewed?
    const existing = product.reviews.find(r => r.userId.toString() === req.user._id.toString());
    if (existing) return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi' });

    product.reviews.push({
      userId: req.user._id,
      username: req.user.username || req.user.email,
      rating: Number(rating),
      comment
    });

    await product.recalculateRating();
    res.status(201).json({ message: 'Đã thêm đánh giá', reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('reviews avgRating');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ avgRating: product.avgRating, reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
