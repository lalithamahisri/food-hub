require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/FoodItem');
const { mockRestaurants, mockFoodItems } = require('./data/mockData');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Restaurant.deleteMany({});
        await FoodItem.deleteMany({});
        console.log('Cleared existing data');

        // Insert restaurants with a seedId (numeric mapping for frontend mock ids)
        const restaurantsToInsert = mockRestaurants.map((r, i) => ({ ...r, seedId: i + 1 }));
        const savedRestaurants = await Restaurant.insertMany(restaurantsToInsert);
        console.log(`${savedRestaurants.length} restaurants inserted`);

        // Insert food items with correct restaurant IDs
        const foodItemsWithIds = mockFoodItems.map((item) => {
            const restaurant = savedRestaurants.find((r) => r.name === item.restaurantName);
            return {
                ...item,
                restaurantId: restaurant._id,
            };
        });

        const savedFoodItems = await FoodItem.insertMany(foodItemsWithIds);
        console.log(`${savedFoodItems.length} food items inserted`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
