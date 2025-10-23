const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shippingInfo: {
    name: String,
    phone: String,
    addressLine: String,
    city: String,
    postalCode: String
  },
  paymentMethod: { type: String, default: 'cod' }, // cod / vnpay / payos / card
  paymentResult: { id: String, status: String, update_time: String, email_address: String },
  itemsPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
