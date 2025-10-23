const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/review.controller');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:id', getReviews);
router.post('/:id', verifyToken, addReview); // cần login

module.exports = router;
