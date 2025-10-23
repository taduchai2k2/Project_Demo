const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'Thiếu productId' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [{ productId, quantity }] });
    } else {
      const idx = cart.products.findIndex(p => p.productId.toString() === productId);
      if (idx > -1) cart.products[idx].quantity += Number(quantity);
      else cart.products.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    const item = cart.products.find(p => p.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Sản phẩm không có trong giỏ' });
    item.quantity = Number(quantity);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.json({ message: 'Đã xóa giỏ hàng' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
