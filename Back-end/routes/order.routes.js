const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

router.post('/', verifyToken, orderCtrl.createOrder);
router.get('/', verifyToken, orderCtrl.getOrdersByUser);
router.get('/:id', verifyToken, orderCtrl.getOrderById);
router.put('/:id/status', verifyToken, isAdmin, orderCtrl.updateOrderStatus);

module.exports = router;
