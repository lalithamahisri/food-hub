const express = require('express');
const {
    getAllFoodItems,
    getFoodItemsByRestaurant,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    searchFoodItems,
} = require('../controllers/foodController');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllFoodItems);
router.get('/restaurant/:restaurantId', getFoodItemsByRestaurant);
router.get('/search', searchFoodItems);
router.get('/:id', getFoodItemById);

// Admin routes (add auth middleware for production)
router.post('/', upload.single('image'), createFoodItem);
router.put('/:id', upload.single('image'), updateFoodItem);
router.delete('/:id', deleteFoodItem);

module.exports = router;
