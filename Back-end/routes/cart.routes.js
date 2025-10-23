const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, cartCtrl.getCart);
router.post('/add', verifyToken, cartCtrl.addProductToCart);
router.put('/update/:productId', verifyToken, cartCtrl.updateQuantity);
router.delete('/remove/:productId', verifyToken, cartCtrl.removeProduct);
router.delete('/clear', verifyToken, cartCtrl.clearCart);

module.exports = router;
