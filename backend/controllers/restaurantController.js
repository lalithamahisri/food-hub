const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            success: true,
            data: restaurants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single restaurant with food items
exports.getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId to avoid Mongoose CastError which results in a 500
        let restaurant = null;

        // If this is a valid ObjectId, search by _id
        if (mongoose.Types.ObjectId.isValid(id)) {
            restaurant = await Restaurant.findById(id);
        } else if (/^\d+$/.test(id)) {
            // numeric id: attempt to find by seedId (seed mapping)
            restaurant = await Restaurant.findOne({ seedId: Number(id) });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant id format',
            });
        }
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        // Use the restaurant's real ObjectId to find food items
        const foodItems = await FoodItem.find({ restaurantId: restaurant._id });

        res.status(200).json({
            success: true,
            data: {
                restaurant,
                foodItems,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Create restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { name, description, cuisineType, address, phone, email, openingHours } = req.body;

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const restaurant = new Restaurant({
            name,
            description,
            cuisineType: cuisineType ? cuisineType.split(',') : [],
            address,
            phone,
            email,
            openingHours,
            image: imagePath,
        });

        await restaurant.save();

        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            data: restaurant,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Restaurant updated successfully',
            data: restaurant,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        // Delete all food items of this restaurant
        await FoodItem.deleteMany({ restaurantId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
