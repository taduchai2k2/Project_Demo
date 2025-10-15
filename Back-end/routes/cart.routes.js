const express = require('express');
const router = express.Router();
const { addProductToCart, getCart, removeProductFromCart } = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addProductToCart);
router.get('/', authMiddleware, getCart);
router.delete('/:productId', authMiddleware, removeProductFromCart);

module.exports = router;
