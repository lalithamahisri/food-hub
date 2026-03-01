const mockRestaurants = [
    {
        name: "Pizza Palace",
        description: "Authentic Italian pizzeria with wood-fired ovens serving the finest pizzas in town",
        cuisineType: ["Italian", "Pizza"],
        rating: 4.8,
        deliveryTime: 25,
        deliveryFee: 50,
        minOrderAmount: 200,
        image: "https://picsum.photos/400/300?random=1",
        address: {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        },
        phone: "212-555-0100",
        email: "info@pizzapalace.com",
        openingHours: {
            open: "11:00 AM",
            close: "11:00 PM"
        }
    },
    {
        name: "Burger Bistro",
        description: "Premium handcrafted burgers made with 100% grass-fed beef and fresh ingredients",
        cuisineType: ["American", "Burgers"],
        rating: 4.6,
        deliveryTime: 20,
        deliveryFee: 40,
        minOrderAmount: 150,
        image: "https://picsum.photos/400/300?random=2",
        address: {
            street: "456 Oak Avenue",
            city: "New York",
            state: "NY",
            zipCode: "10002",
            country: "USA"
        },
        phone: "212-555-0101",
        email: "info@burgerbistro.com",
        openingHours: {
            open: "10:00 AM",
            close: "10:00 PM"
        }
    },
    {
        name: "Wok Express",
        description: "Authentic Asian cuisine with fresh vegetables, tender meats and aromatic spices",
        cuisineType: ["Chinese", "Asian", "Vietnamese"],
        rating: 4.5,
        deliveryTime: 30,
        deliveryFee: 45,
        minOrderAmount: 180,
        image: "https://picsum.photos/400/300?random=3",
        address: {
            street: "789 Dragon Lane",
            city: "New York",
            state: "NY",
            zipCode: "10003",
            country: "USA"
        },
        phone: "212-555-0102",
        email: "info@wokexpress.com",
        openingHours: {
            open: "11:30 AM",
            close: "11:30 PM"
        }
    },
    {
        name: "Sushi Sensation",
        description: "Freshly prepared sushi and authentic Japanese dishes with the finest imports",
        cuisineType: ["Japanese", "Sushi"],
        rating: 4.9,
        deliveryTime: 35,
        deliveryFee: 60,
        minOrderAmount: 300,
        image: "https://picsum.photos/400/300?random=4",
        address: {
            street: "321 Pearl Street",
            city: "New York",
            state: "NY",
            zipCode: "10004",
            country: "USA"
        },
        phone: "212-555-0103",
        email: "info@sushisensation.com",
        openingHours: {
            open: "12:00 PM",
            close: "11:00 PM"
        }
    },
    {
        name: "Taco Fiesta",
        description: "Vibrant Mexican street food with authentic recipes and fresh tortillas made daily",
        cuisineType: ["Mexican", "Tacos"],
        rating: 4.4,
        deliveryTime: 25,
        deliveryFee: 35,
        minOrderAmount: 150,
        image: "https://picsum.photos/400/300?random=5",
        address: {
            street: "555 Fiesta Road",
            city: "New York",
            state: "NY",
            zipCode: "10005",
            country: "USA"
        },
        phone: "212-555-0104",
        email: "info@tacofiesta.com",
        openingHours: {
            open: "10:30 AM",
            close: "10:30 PM"
        }
    },
    {
        name: "Curry House",
        description: "Authentic Indian cuisine with traditional spices and time-honored cooking methods",
        cuisineType: ["Indian", "Curry"],
        rating: 4.7,
        deliveryTime: 40,
        deliveryFee: 50,
        minOrderAmount: 200,
        image: "https://picsum.photos/400/300?random=6",
        address: {
            street: "888 Spice Street",
            city: "New York",
            state: "NY",
            zipCode: "10006",
            country: "USA"
        },
        phone: "212-555-0105",
        email: "info@curryhouse.com",
        openingHours: {
            open: "11:00 AM",
            close: "11:00 PM"
        }
    }
];

const mockFoodItems = [
    { name: "Margherita Pizza", description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce", price: 450, restaurantName: "Pizza Palace", category: "Pizza", image: "https://picsum.photos/400/300?random=7", rating: 4.9, isVegetarian: true, isNonVegetarian: false, preparationTime: 20 },
    { name: "Pepperoni Supreme", description: "Loaded with premium pepperoni, mozzarella, and our special tomato sauce", price: 550, restaurantName: "Pizza Palace", category: "Pizza", image: "https://picsum.photos/400/300?random=8", rating: 4.8, isVegetarian: false, isNonVegetarian: true, preparationTime: 20 },
    { name: "Vegetarian Delight", description: "Mixed vegetables with three cheese blend on thin crust", price: 500, restaurantName: "Pizza Palace", category: "Pizza", image: "https://picsum.photos/400/300?random=9", rating: 4.7, isVegetarian: true, isNonVegetarian: false, preparationTime: 18 },
    { name: "Classic Cheeseburger", description: "Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce", price: 350, restaurantName: "Burger Bistro", category: "Burgers", image: "https://picsum.photos/400/300?random=10", rating: 4.8, isVegetarian: false, isNonVegetarian: true, preparationTime: 12 },
    { name: "Bacon BBQ Burger", description: "Double beef patties with crispy bacon, BBQ sauce, and onion rings inside", price: 450, restaurantName: "Burger Bistro", category: "Burgers", image: "https://picsum.photos/400/300?random=11", rating: 4.9, isVegetarian: false, isNonVegetarian: true, preparationTime: 15 },
    { name: "Mushroom Swiss Burger", description: "Beef patty topped with sautéed mushrooms and Swiss cheese", price: 400, restaurantName: "Burger Bistro", category: "Burgers", image: "https://picsum.photos/400/300?random=12", rating: 4.6, isVegetarian: false, isNonVegetarian: true, preparationTime: 14 },
    { name: "Chicken Fried Rice", description: "Fragrant jasmine rice stir-fried with tender chicken and vegetables", price: 300, restaurantName: "Wok Express", category: "Rice Dishes", image: "https://picsum.photos/400/300?random=13", rating: 4.7, isVegetarian: false, isNonVegetarian: true, preparationTime: 15 },
    { name: "Vegetable Lo Mein", description: "Noodles stir-fried with seasonal vegetables and garlic sauce", price: 280, restaurantName: "Wok Express", category: "Noodles", image: "https://picsum.photos/400/300?random=14", rating: 4.5, isVegetarian: true, isNonVegetarian: false, preparationTime: 12 },
    { name: "Beef and Broccoli", description: "Tender beef with crispy broccoli in savory brown sauce", price: 350, restaurantName: "Wok Express", category: "Meat Dishes", image: "https://picsum.photos/400/300?random=15", rating: 4.8, isVegetarian: false, isNonVegetarian: true, preparationTime: 18 },
    { name: "California Roll", description: "Imitation crab, avocado, and cucumber rolled in rice and nori", price: 400, restaurantName: "Sushi Sensation", category: "Sushi", image: "https://picsum.photos/400/300?random=16", rating: 4.9, isVegetarian: false, isNonVegetarian: true, preparationTime: 10 },
    { name: "Spicy Tuna Roll", description: "Fresh spicy tuna with cucumber and avocado wrapped in nori", price: 450, restaurantName: "Sushi Sensation", category: "Sushi", image: "https://picsum.photos/400/300?random=17", rating: 4.8, isVegetarian: false, isNonVegetarian: true, preparationTime: 12 },
    { name: "Vegetable Tempura", description: "Assorted vegetables lightly battered and deep-fried until crispy", price: 350, restaurantName: "Sushi Sensation", category: "Appetizers", image: "https://picsum.photos/400/300?random=18", rating: 4.6, isVegetarian: true, isNonVegetarian: false, preparationTime: 8 },
    { name: "Al Pastor Tacos", description: "Marinated pork with pineapple, onion, and cilantro", price: 250, restaurantName: "Taco Fiesta", category: "Tacos", image: "https://picsum.photos/400/300?random=19", rating: 4.7, isVegetarian: false, isNonVegetarian: true, preparationTime: 10 },
    { name: "Carne Asada Tacos", description: "Grilled beef with lime, cilantro, and charred onions", price: 280, restaurantName: "Taco Fiesta", category: "Tacos", image: "https://picsum.photos/400/300?random=20", rating: 4.8, isVegetarian: false, isNonVegetarian: true, preparationTime: 11 },
    { name: "Black Bean Tacos", description: "Seasoned black beans with lettuce, cheese, and pico de gallo", price: 200, restaurantName: "Taco Fiesta", category: "Tacos", image: "https://picsum.photos/400/300?random=21", rating: 4.5, isVegetarian: true, isNonVegetarian: false, preparationTime: 8 },
    { name: "Butter Chicken", description: "Tender chicken cooked in creamy tomato butter sauce with aromatic spices", price: 400, restaurantName: "Curry House", category: "Curries", image: "https://picsum.photos/400/300?random=22", rating: 4.9, isVegetarian: false, isNonVegetarian: true, preparationTime: 20 },
    { name: "Paneer Tikka Masala", description: "Cottage cheese cubes in rich spiced tomato cream sauce", price: 380, restaurantName: "Curry House", category: "Curries", image: "https://picsum.photos/400/300?random=23", rating: 4.8, isVegetarian: true, isNonVegetarian: false, preparationTime: 18 },
    { name: "Lamb Rogan Josh", description: "Aromatic curry with tender lamb, tomatoes, and traditional Indian spices", price: 450, restaurantName: "Curry House", category: "Curries", image: "https://picsum.photos/400/300?random=24", rating: 4.9, isVegetarian: false, isNonVegetarian: true, preparationTime: 25 }
];

module.exports = { mockRestaurants, mockFoodItems };
