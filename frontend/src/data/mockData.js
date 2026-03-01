export const RESTAURANTS = [
    {
        id: 1,
        name: 'Pizza Paradise',
        cuisine: 'Italian',
        rating: 4.5,
        deliveryTime: '30-40 mins',
        deliveryFee: 2.99,
        image: 'https://source.unsplash.com/800x600/?pizza,restaurant',
        description: 'Authentic Italian pizzas and pastas'
    },
    {
        id: 2,
        name: 'Burger Barn',
        cuisine: 'American',
        rating: 4.3,
        deliveryTime: '20-30 mins',
        deliveryFee: 1.99,
        image: 'https://source.unsplash.com/800x600/?burger,restaurant',
        description: 'Juicy burgers and crispy fries'
    },
    {
        id: 3,
        name: 'Sushi Supreme',
        cuisine: 'Japanese',
        rating: 4.7,
        deliveryTime: '25-35 mins',
        deliveryFee: 3.99,
        image: 'data:image/jpeg;base64,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',
        description: 'Fresh sushi and Japanese dishes'
    },
    {
        id: 4,
        name: 'Tandoori Kitchen',
        cuisine: 'Indian',
        rating: 4.4,
        deliveryTime: '35-45 mins',
        deliveryFee: 2.49,
        image: 'https://source.unsplash.com/800x600/?tandoori,indian',
        description: 'Authentic Indian cuisine'
    },
    {
        id: 5,
        name: 'Dragon Express',
        cuisine: 'Chinese',
        rating: 4.2,
        deliveryTime: '25-35 mins',
        deliveryFee: 2.99,
        image: 'https://source.unsplash.com/800x600/?chinese,restaurant',
        description: 'Traditional Chinese dishes'
    },
    {
        id: 6,
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        rating: 4.6,
        deliveryTime: '20-30 mins',
        deliveryFee: 1.99,
        image: 'https://source.unsplash.com/800x600/?tacos,mexican',
        description: 'Delicious Mexican food'
    }
    ,
    {
        id: 7,
        name: 'Momo Magic',
        cuisine: 'Momos, Street Food',
        rating: 4.6,
        deliveryTime: '20-30 mins',
        deliveryFee: 1.49,
        image: 'https://source.unsplash.com/collection/190727/800x600?momos',
        description: 'Steamed and fried momos with house chutneys'
    },
    {
        id: 8,
        name: 'Gelato Garden',
        cuisine: 'Dessert, Gelato',
        rating: 4.8,
        deliveryTime: '10-20 mins',
        deliveryFee: 0.99,
        image: 'https://source.unsplash.com/800x600/?gelato,ice-cream',
        description: 'Creamy gelato with seasonal flavors'
    },
    {
        id: 9,
        name: 'Waffle Works',
        cuisine: 'Waffles, Breakfast',
        rating: 4.7,
        deliveryTime: '15-25 mins',
        deliveryFee: 1.99,
        image: 'https://source.unsplash.com/800x600/?waffles,breakfast',
        description: 'Crispy waffles topped with fresh fruits and syrup'
    },
    {
        id: 10,
        name: 'Biryani Bites',
        cuisine: 'Biryani, Indian',
        rating: 4.6,
        deliveryTime: '30-45 mins',
        deliveryFee: 2.99,
        image: 'https://source.unsplash.com/800x600/?biryani,food',
        description: 'Fragrant biryanis served with raita and salad'
    },
    {
        id: 11,
        name: 'Brew & Sip',
        cuisine: 'Beverages, Cafe',
        rating: 4.5,
        deliveryTime: '10-20 mins',
        deliveryFee: 0.99,
        image: 'https://source.unsplash.com/800x600/?coffee,beverage',
        description: 'Specialty coffees, teas and refreshing beverages'
    }
];

export const MENU_ITEMS = {
    1: [ // Pizza Paradise
        { id: 1, name: 'Margherita Pizza', price: 122.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?margherita-pizza', rating: 4.5 },
        { id: 2, name: 'Pepperoni Pizza', price: 148.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?pepperoni-pizza', rating: 4.6 },
        { id: 3, name: 'Vegetarian Pizza', price: 115.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?vegetarian-pizza', rating: 4.3 },
        { id: 4, name: 'Pasta Carbonara', price: 105.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?pasta-carbonara', rating: 4.7 },
        { id: 40, name: 'Four Cheese Pizza', price: 155.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?four-cheese-pizza', rating: 4.7 },
        { id: 41, name: 'Truffle Margherita', price: 175.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?truffle-pizza', rating: 4.8 },
        { id: 42, name: 'BBQ Chicken Pizza', price: 165.49, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?bbq-chicken-pizza', rating: 4.6 },
        { id: 43, name: 'Pesto Veg Delight', price: 135.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?pesto-pizza', rating: 4.5 },
        { id: 44, name: 'Garlic & Herb Bread', price: 145.99, restaurantId: 1, image: 'https://source.unsplash.com/150x150/?garlic-bread', rating: 4.4 }
    ],
    2: [ // Burger Barn
        { id: 5, name: 'Classic Burger', price: 95.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?classic-burger', rating: 4.4 },
        { id: 6, name: 'Double Cheeseburger', price: 115.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?cheeseburger', rating: 4.6 },
        { id: 7, name: 'Bacon Burger', price: 125.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?bacon-burger', rating: 4.5 },
        { id: 8, name: 'French Fries', price: 140.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?french-fries', rating: 4.3 },
        { id: 45, name: 'Veggie Deluxe', price: 105.49, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?veggie-burger', rating: 4.5 },
        { id: 46, name: 'Mushroom Swiss', price: 114.49, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?mushroom-burger', rating: 4.6 },
        { id: 47, name: 'Spicy Jalapeño', price: 113.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?jalapeno-burger', rating: 4.4 },
        { id: 48, name: 'BBQ Bacon Deluxe', price: 138.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?bbq-burger', rating: 4.7 },
        { id: 49, name: 'Onion Rings (side)', price: 130.99, restaurantId: 2, image: 'https://source.unsplash.com/150x150/?onion-rings', rating: 4.2 }
    ],
    3: [ // Sushi Supreme
        { id: 9, name: 'California Roll', price: 85.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?california-roll', rating: 4.5 },
        { id: 10, name: 'Spicy Tuna Roll', price: 95.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?spicy-tuna-roll', rating: 4.6 },
        { id: 11, name: 'Dragon Roll', price: 125.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?dragon-roll', rating: 4.8 },
        { id: 12, name: 'Sushi Combo', price: 245.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?sushi-combo', rating: 4.7 },
        { id: 50, name: 'Salmon Nigiri', price: 65.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?salmon-nigiri', rating: 4.8 },
        { id: 51, name: 'Eel Avocado Roll', price: 115.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?eel-roll', rating: 4.6 },
        { id: 52, name: 'Veg Tempura Roll', price: 94.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?tempura-roll', rating: 4.5 },
        { id: 53, name: 'Spicy Salmon Bowl', price: 135.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?salmon-bowl', rating: 4.7 },
        { id: 54, name: 'Miso Soup', price: 75.99, restaurantId: 3, image: 'https://source.unsplash.com/150x150/?miso-soup', rating: 4.3 }
    ],
    4: [ // Tandoori Kitchen
        { id: 13, name: 'Butter Chicken', price: 145.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?butter-chicken', rating: 4.7 },
        { id: 14, name: 'Tandoori Chicken', price: 125.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?tandoori-chicken', rating: 4.5 },
        { id: 15, name: 'Biryani', price: 115.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?biryani', rating: 4.6 },
        { id: 16, name: 'Naan', price: 35.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?naan', rating: 4.4 },
        { id: 55, name: 'Paneer Tikka', price: 105.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?paneer-tikka', rating: 4.6 },
        { id: 56, name: 'Rogan Josh', price: 135.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?rogan-josh', rating: 4.7 },
        { id: 57, name: 'Dal Makhani', price: 75.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?dal-makhani', rating: 4.5 },
        { id: 58, name: 'Hyderabadi Dum Biryani', price: 135.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?hyderabadi-biryani', rating: 4.8 },
        { id: 59, name: 'Raita', price: 15.99, restaurantId: 4, image: 'https://source.unsplash.com/150x150/?raita', rating: 4.2 }
    ],
    5: [ // Dragon Express
        { id: 17, name: 'Kung Pao Chicken', price: 105.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?kung-pao-chicken', rating: 4.5 },
        { id: 18, name: 'Fried Rice', price: 85.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?fried-rice', rating: 4.3 },
        { id: 19, name: 'Sweet & Sour Pork', price: 115.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?sweet-sour-pork', rating: 4.4 },
        { id: 20, name: 'Chow Mein', price: 95.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?chow-mein', rating: 4.2 },
        { id: 60, name: 'Orange Chicken', price: 114.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?orange-chicken', rating: 4.6 },
        { id: 61, name: 'Dim Sum Platter', price: 125.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?dim-sum', rating: 4.7 },
        { id: 62, name: 'Szechuan Beef', price: 124.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?szechuan-beef', rating: 4.6 },
        { id: 63, name: 'Veg Spring Rolls', price: 54.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?spring-rolls', rating: 4.3 },
        { id: 64, name: 'Hot & Sour Soup', price: 75.99, restaurantId: 5, image: 'https://source.unsplash.com/150x150/?hot-sour-soup', rating: 4.2 }
    ],
    6: [ // Taco Fiesta
        { id: 21, name: 'Chicken Tacos', price: 79.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?chicken-tacos', rating: 4.5 },
        { id: 22, name: 'Beef Burrito', price: 95.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?beef-burrito', rating: 4.6 },
        { id: 23, name: 'Quesadilla', price: 85.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?quesadilla', rating: 4.4 },
        { id: 24, name: 'Nachos Supreme', price: 105.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?nachos', rating: 4.7 },
        { id: 65, name: 'Fish Tacos', price: 85.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?fish-tacos', rating: 4.6 },
        { id: 66, name: 'Veggie Tacos', price: 74.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?veggie-tacos', rating: 4.5 },
        { id: 67, name: 'Churros', price: 44.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?churros', rating: 4.7 },
        { id: 68, name: 'Guacamole & Chips', price: 35.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?guacamole', rating: 4.6 },
        { id: 69, name: 'Elote (Street Corn)', price: 45.99, restaurantId: 6, image: 'https://source.unsplash.com/150x150/?street-corn', rating: 4.4 }
    ],
    7: [ // Momo Magic
        { id: 25, name: 'Steamed Veg Momos', price: 57.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?momos', rating: 4.6 },
        { id: 26, name: 'Fried Chicken Momos', price: 75.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?fried-momos', rating: 4.7 },
        { id: 27, name: 'Momo Platter', price: 12.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?momo-platter', rating: 4.8 },
        { id: 70, name: 'Schezwan Chicken Momos', price: 84.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?schezwan-momos', rating: 4.7 },
        { id: 71, name: 'Cheese Corn Momos', price: 65.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?cheese-momos', rating: 4.6 },
        { id: 72, name: 'Paneer & Spinach Momos', price: 64.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?paneer-momos', rating: 4.5 },
        { id: 73, name: 'Momo Dips Trio', price: 25.99, restaurantId: 7, image: 'https://source.unsplash.com/150x150/?dipping-sauce', rating: 4.4 }
    ],
    8: [ // Gelato Garden
        { id: 28, name: 'Classic Vanilla Gelato', price: 97.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?vanilla-gelato', rating: 4.8 },
        { id: 29, name: 'Chocolate Hazelnut Gelato', price: 44.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?chocolate-gelato', rating: 4.9 },
        { id: 30, name: 'Seasonal Sorbet', price: 35.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?sorbet', rating: 4.6 },
        { id: 74, name: 'Pistachio Gelato', price: 42.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?pistachio-gelato', rating: 4.8 },
        { id: 75, name: 'Stracciatella', price: 42.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?stracciatella', rating: 4.7 },
        { id: 76, name: 'Mango Sorbet', price: 35.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?mango-sorbet', rating: 4.6 },
        { id: 77, name: 'Affogato', price: 45.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?affogato', rating: 4.8 },
        { id: 78, name: 'Gelato Flight (3 scoops)', price: 65.99, restaurantId: 8, image: 'https://source.unsplash.com/150x150/?gelato-flight', rating: 4.9 }
    ],
    9: [ // Waffle Works
        { id: 31, name: 'Classic Belgian Waffle', price: 65.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?waffle', rating: 4.7 },
        { id: 32, name: 'Nutella & Banana', price: 75.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?nutella-waffle', rating: 4.8 },
        { id: 33, name: 'Savory Chicken Waffle', price: 95.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?chicken-waffle', rating: 4.5 },
        { id: 79, name: 'Berry Compote Waffle', price: 74.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?berry-waffle', rating: 4.7 },
        { id: 80, name: 'Ice Cream Waffle', price: 84.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?ice-cream-waffle', rating: 4.8 },
        { id: 81, name: 'Chicken & Waffles', price: 115.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?chicken-and-waffles', rating: 4.6 },
        { id: 82, name: 'Herb & Cheese Savory Waffle', price: 75.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?savory-waffle', rating: 4.5 },
        { id: 83, name: 'Mini Waffle Bites (6)', price: 45.99, restaurantId: 9, image: 'https://source.unsplash.com/150x150/?mini-waffles', rating: 4.4 }
    ],
    10: [ // Biryani Bites
        { id: 34, name: 'Chicken Biryani', price: 112.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?chicken-biryani', rating: 4.7 },
        { id: 35, name: 'Veg Biryani', price: 95.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?veg-biryani', rating: 4.5 },
        { id: 36, name: 'Mutton Biryani', price: 135.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?mutton-biryani', rating: 4.8 },
        { id: 84, name: 'Egg Biryani', price: 94.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?egg-biryani', rating: 4.4 },
        { id: 85, name: 'Lucknowi Biryani', price: 125.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?lucknowi-biryani', rating: 4.7 },
        { id: 86, name: 'Biryani For Two', price: 215.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?biryani-for-two', rating: 4.8 },
        { id: 87, name: 'Kebab Platter (side)', price: 85.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?kebab-platter', rating: 4.6 },
        { id: 88, name: 'Raita & Salad', price: 25.99, restaurantId: 10, image: 'https://source.unsplash.com/150x150/?raita-salad', rating: 4.3 }
    ],
    11: [ // Brew & Sip
        { id: 37, name: 'Caramel Latte', price: 45.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?latte', rating: 4.6 },
        { id: 38, name: 'Iced Matcha', price: 45.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?matcha', rating: 4.5 },
        { id: 39, name: 'Sparkling Lemonade', price: 35.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?lemonade', rating: 4.4 },
        { id: 89, name: 'Flat White', price: 35.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?flat-white', rating: 4.6 },
        { id: 90, name: 'Cold Brew', price: 45.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?cold-brew', rating: 4.7 },
        { id: 91, name: 'Honey Lemon Tea', price: 25.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?honey-lemon-tea', rating: 4.5 },
        { id: 92, name: 'Iced Americano', price: 35.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?iced-americano', rating: 4.4 },
        { id: 93, name: 'Mocha Frappe', price: 55.99, restaurantId: 11, image: 'https://source.unsplash.com/150x150/?frappe', rating: 4.6 }
    ]
};
