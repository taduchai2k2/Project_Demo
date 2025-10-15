const Cart = require('../models/cart.model');

// 🛒 Thêm sản phẩm vào giỏ hàng
exports.addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    // Nếu chưa có giỏ thì tạo mới
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // Nếu có rồi thì kiểm tra sản phẩm đã tồn tại chưa
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Nếu có rồi thì tăng số lượng
        cart.products[productIndex].quantity += quantity;
      } else {
        // Nếu chưa có thì thêm mới
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Đã thêm vào giỏ hàng', cart });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// 🧾 Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) return res.status(200).json({ message: 'Giỏ hàng trống', products: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// ❌ Xóa 1 sản phẩm khỏi giỏ
exports.removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: 'Đã xóa sản phẩm', cart });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
