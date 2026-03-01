# Food Delivery Backend API

A complete Node.js/Express backend for a food delivery application with MongoDB database, user authentication, restaurant management, food items, and order processing.

## Features

✅ **User Authentication** - JWT-based registration and login  
✅ **Restaurant Management** - CRUD operations for restaurants  
✅ **Food Items** - Complete food item management with image uploads  
✅ **Order Management** - Create, track, and manage orders  
✅ **Image Upload** - Support for restaurant and food item images  
✅ **Rating & Reviews** - Rate orders and provide feedback  
✅ **Search Functionality** - Search food items by name, category, or description  

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Cloud - MongoDB Atlas)
- npm or yarn

## Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (already created, update if needed)
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Seed the database with mock data** (Optional but recommended)
   ```bash
   npm run seed
   ```

## Running the Server

- **Development mode** (with auto-reload)
  ```bash
  npm run dev
  ```

- **Production mode**
  ```bash
  npm start
  ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |

### Restaurant Routes (`/api/restaurants`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all restaurants | ❌ |
| GET | `/:id` | Get restaurant details | ❌ |
| POST | `/` | Create restaurant | ❌ |
| PUT | `/:id` | Update restaurant | ❌ |
| DELETE | `/:id` | Delete restaurant | ❌ |

### Food Items Routes (`/api/food`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all food items | ❌ |
| GET | `/restaurant/:restaurantId` | Get food by restaurant | ❌ |
| GET | `/search` | Search food items | ❌ |
| GET | `/:id` | Get single food item | ❌ |
| POST | `/` | Create food item | ❌ |
| PUT | `/:id` | Update food item | ❌ |
| DELETE | `/:id` | Delete food item | ❌ |

### Orders Routes (`/api/orders`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create order | ✅ |
| GET | `/user/my-orders` | Get user's orders | ✅ |
| GET | `/:id` | Get order details | ✅ |
| PUT | `/:id/rate` | Rate order | ✅ |
| PUT | `/:id/status` | Update order status | ❌ |
| GET | `/` | Get all orders | ❌ |

## Example Requests

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Order
```bash
POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "restaurantId": "restaurant_id",
  "items": [
    {
      "foodItemId": "food_item_id",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "cod"
}
```

### Create Restaurant (with image)
```bash
POST /api/restaurants
Content-Type: multipart/form-data

Form Data:
- name: "Pizza Palace"
- description: "Authentic Italian pizzeria"
- cuisineType: "Italian,Pizza"
- phone: "212-555-0100"
- email: "info@pizzapalace.com"
- image: <file>
```

## Database Schema

### User
- firstName, lastName, email (unique), password, phone
- address (nested), profileImage
- timestamps

### Restaurant
- name, description, cuisineType (array)
- rating, deliveryTime, deliveryFee, minOrderAmount
- image, address, phone, email, openingHours
- isOpen, totalOrders, timestamps

### FoodItem
- name, description, price
- restaurantId (reference), restaurantName, category
- image, rating, isVegetarian, isNonVegetarian
- preparationTime, totalOrders, available
- timestamps

### Order
- orderId (unique), userId (reference), restaurantId (reference)
- items (array with quantity, price), totalAmount, deliveryFee
- finalAmount, deliveryAddress, status, paymentStatus
- paymentMethod, transactionId, estimatedDeliveryTime
- rating, review, timestamps

## File Upload

Images are stored in the `/uploads` directory. After upload, files are accessible at `/uploads/<filename>`.

Supported formats: JPEG, PNG, GIF, WebP  
Maximum file size: 10MB

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/food-delivery |
| `JWT_SECRET` | Secret key for JWT tokens | change_this |
| `NODE_ENV` | Environment mode | development |

## Folder Structure

```
backend/
├── config/              # Database configuration
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── restaurantController.js
│   ├── foodController.js
│   └── orderController.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   ├── upload.js
│   └── errorHandler.js
├── models/              # Database schemas
│   ├── User.js
│   ├── Restaurant.js
│   ├── FoodItem.js
│   └── Order.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── restaurantRoutes.js
│   ├── foodRoutes.js
│   └── orderRoutes.js
├── data/                # Mock data
│   └── mockData.js
├── uploads/             # Uploaded images
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── seed.js             # Database seeding script
└── server.js           # Main server file
```

## Future Enhancements

- [ ] Admin authentication and authorization
- [ ] Payment gateway integration
- [ ] Real-time order tracking with WebSockets
- [ ] Email notifications
- [ ] Push notifications
- [ ] Delivery personnel management
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Rating and recommendation system

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
