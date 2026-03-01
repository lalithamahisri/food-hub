const express = require('express');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    rateOrder,
    getAllOrders,
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes - User orders
router.post('/', auth, createOrder);
router.get('/user/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/rate', auth, rateOrder);

// Admin routes - currently protected by auth (extend with role-based checks if needed)
router.put('/:id/status', auth, updateOrderStatus);
router.get('/', auth, getAllOrders);

module.exports = router;
