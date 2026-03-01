const mongoose = require('mongoose');
const FoodItem = require('../models/FoodItem');
const Restaurant = require('../models/Restaurant');

// Get all food items
exports.getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find().populate('restaurantId', 'name');
        res.status(200).json({
            success: true,
            data: foodItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get food items by restaurant
exports.getFoodItemsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        let targetRestaurantId = null;

        if (mongoose.Types.ObjectId.isValid(restaurantId)) {
            targetRestaurantId = restaurantId;
        } else if (/^\d+$/.test(restaurantId)) {
            const restaurant = await Restaurant.findOne({ seedId: Number(restaurantId) });
            if (!restaurant) {
                return res.status(404).json({ success: false, message: 'Restaurant not found' });
            }
            targetRestaurantId = restaurant._id;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid restaurant id format' });
        }

        const foodItems = await FoodItem.find({ restaurantId: targetRestaurantId });

        res.status(200).json({ success: true, data: foodItems });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single food item
exports.getFoodItemById = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id).populate('restaurantId');

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found',
            });
        }

        res.status(200).json({
            success: true,
            data: foodItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Create food item
exports.createFoodItem = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            restaurantId,
            category,
            isVegetarian,
            isNonVegetarian,
            preparationTime,
        } = req.body;

        // Verify restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const foodItem = new FoodItem({
            name,
            description,
            price,
            restaurantId,
            restaurantName: restaurant.name,
            category,
            image: imagePath,
            isVegetarian: isVegetarian === 'true',
            isNonVegetarian: isNonVegetarian === 'true',
            preparationTime: preparationTime || 15,
        });

        await foodItem.save();

        res.status(201).json({
            success: true,
            message: 'Food item created successfully',
            data: foodItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update food item
exports.updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const foodItem = await FoodItem.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Food item updated successfully',
            data: foodItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete food item
exports.deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.params.id);

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Food item deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Search food items
exports.searchFoodItems = async (req, res) => {
    try {
        const { query } = req.query;
        const foodItems = await FoodItem.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ],
        }).populate('restaurantId', 'name');

        res.status(200).json({
            success: true,
            data: foodItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
