const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const upload = require('../middleware/upload.middleware');

// public
router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProductById);

// admin CRUD
router.post('/', verifyToken, isAdmin, upload.single('image'), productCtrl.createProduct);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), productCtrl.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productCtrl.deleteProduct);

module.exports = router;
