const Order = require('../models/Order');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

// Create order
exports.createOrder = async (req, res) => {
    try {
        const { restaurantId, items, deliveryAddress, paymentMethod, notes } = req.body;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const foodItem = await FoodItem.findById(item.foodItemId);
            if (!foodItem) {
                return res.status(404).json({
                    success: false,
                    message: `Food item ${item.foodItemId} not found`,
                });
            }

            const itemTotal = foodItem.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                foodItemId: foodItem._id,
                name: foodItem.name,
                price: foodItem.price,
                quantity: item.quantity,
                image: foodItem.image,
                total: itemTotal,
            });
        }

        const deliveryFee = restaurant.deliveryFee;
        const finalAmount = totalAmount + deliveryFee;

        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const order = new Order({
            orderId,
            userId: req.userId,
            restaurantId,
            restaurantName: restaurant.name,
            items: orderItems,
            totalAmount,
            deliveryFee,
            finalAmount,
            deliveryAddress,
            paymentMethod,
            notes,
            estimatedDeliveryTime: restaurant.deliveryTime,
        });

        await order.save();

        // Increment restaurant total orders
        await Restaurant.findByIdAndUpdate(restaurantId, {
            $inc: { totalOrders: 1 },
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })
            .populate('restaurantId', 'name image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('restaurantId')
            .populate('userId', '-password');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Check if user is authorized to view this order
        if (order.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order',
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status',
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Rate order
exports.rateOrder = async (req, res) => {
    try {
        const { rating, review } = req.body;

        if (rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 0 and 5',
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { rating, review },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order rated successfully',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', '-password')
            .populate('restaurantId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
