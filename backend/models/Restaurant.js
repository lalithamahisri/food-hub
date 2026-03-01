const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cuisineType: [String],
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        deliveryTime: {
            type: Number,
            default: 30,
        },
        deliveryFee: {
            type: Number,
            default: 0,
        },
        minOrderAmount: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        phone: String,
        email: String,
        openingHours: {
            open: String,
            close: String,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        totalOrders: {
            type: Number,
            default: 0,
        },
        seedId: {
            type: Number,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
