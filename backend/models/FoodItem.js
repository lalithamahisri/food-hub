const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        restaurantName: String,
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        isVegetarian: {
            type: Boolean,
            default: false,
        },
        isNonVegetarian: {
            type: Boolean,
            default: false,
        },
        preparationTime: {
            type: Number,
            default: 15,
        },
        totalOrders: {
            type: Number,
            default: 0,
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FoodItem', foodItemSchema);
