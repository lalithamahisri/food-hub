const express = require('express');
const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require('../controllers/restaurantController');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Admin routes (add auth middleware for production)
router.post('/', upload.single('image'), createRestaurant);
router.put('/:id', upload.single('image'), updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;
