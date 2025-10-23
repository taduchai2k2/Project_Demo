const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.createOrder = async (req, res) => {
  try {
    const { shippingInfo, paymentMethod } = req.body;
    // lấy cart
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart || cart.products.length === 0) return res.status(400).json({ message: 'Giỏ hàng rỗng' });

    const products = cart.products.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.image
    }));

    const itemsPrice = products.reduce((s, p) => s + p.price * p.quantity, 0);
    const shippingPrice = itemsPrice > 20000 ? 0 : 50; // ví dụ
    const totalPrice = itemsPrice + shippingPrice;

    const order = new Order({
      userId: req.user._id,
      products,
      shippingInfo,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      status: 'pending'
    });
    await order.save();

    // cập nhật sold & stock
    for (const p of products) {
      await Product.findByIdAndUpdate(p.productId, { $inc: { sold: p.quantity, stock: -p.quantity } });
    }

    // xóa cart
    await Cart.findOneAndDelete({ userId: req.user._id });

    res.status(201).json({ message: 'Đặt hàng thành công', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId','username email');
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// admin update status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
