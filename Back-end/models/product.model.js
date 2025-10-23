const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  // ✅ Mảng ảnh thay vì ảnh đơn lẻ
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "Phải có ít nhất 1 ảnh sản phẩm"
    }
  },

  category: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },

  avgRating: { type: Number, default: 0 },
  reviews: [reviewSchema],

  tags: [{ type: String }],

  options: [
    {
      color: { type: String },
      storage: { type: String },
      price: { type: Number },
    }
  ]
}, { timestamps: true });

// ✅ Hàm tự động tính lại rating trung bình
productSchema.methods.recalculateRating = function() {
  if (!this.reviews || this.reviews.length === 0) {
    this.avgRating = 0;
  } else {
    const sum = this.reviews.reduce((s, r) => s + r.rating, 0);
    this.avgRating = Math.round((sum / this.reviews.length) * 10) / 10;
  }
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);
