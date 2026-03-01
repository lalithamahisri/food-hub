const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        restaurantName: String,
        items: [
            {
                foodItemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'FoodItem',
                },
                name: String,
                price: Number,
                quantity: Number,
                image: String,
                total: Number,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        deliveryFee: Number,
        discount: {
            type: Number,
            default: 0,
        },
        finalAmount: {
            type: Number,
            required: true,
        },
        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'upi', 'wallet', 'cod'],
            default: 'cod',
        },
        transactionId: String,
        estimatedDeliveryTime: Number,
        actualDeliveryTime: Date,
        notes: String,
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        review: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
