# Quick Start Guide

Get the Food Delivery Backend running in 5 minutes!

## Prerequisites

Make sure you have installed:
- **Node.js** (v14+): https://nodejs.org/
- **MongoDB** (Local or Cloud): https://www.mongodb.com/
  - For quick testing, use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

**Expected output:**
```
added XXX packages in Xs
```

## Step 2: Setup MongoDB

### Option A: MongoDB Atlas (Recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/food-delivery`)
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery
   ```

### Option B: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   ```

## Step 3: Configure Environment

The `.env` file is already created. Update if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Step 4: Seed Database (Optional)

Load sample restaurants and food items:

```bash
npm run seed
```

**Output:**
```
MongoDB Connected
Cleared existing data
6 restaurants inserted
18 food items inserted
Database seeded successfully!
```

## Step 5: Start Server

### Development Mode (Auto-reload on file changes)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

**Expected output:**
```
Server running on port 5000
Environment: development
API Health: http://localhost:5000/api/health
```

## Step 6: Test the API

### Option A: Browser (Health Check)
```
http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Option B: cURL

**Get all restaurants:**
```bash
curl http://localhost:5000/api/restaurants
```

**Register user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

**Get all food items:**
```bash
curl http://localhost:5000/api/food
```

### Option C: Postman

1. Download Postman: https://www.postman.com/downloads/
2. Use endpoints from `API_DOCUMENTATION.md`
3. Set `Authorization` header for protected routes

## Common Issues & Solutions

### ❌ MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- If using MongoDB Atlas, ensure IP whitelist includes your IP

### ❌ Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
- Change port in `.env`: `PORT=5001`
- Or kill process using port 5000

### ❌ Dependencies Not Installing
```
npm ERR! Could not resolve dependency
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ JWT Token Errors
```
Error: Token is not valid
```

**Solution:**
- Ensure token is from login/register response
- Token format: `Authorization: Bearer <token>`
- Tokens expire in 7 days

## Next Steps

1. **Read full API documentation:** See `API_DOCUMENTATION.md`
2. **Connect Frontend:** Update frontend API base URL to `http://localhost:5000/api`
3. **Production Deployment:** Deploy to Heroku, Railway, or Render
4. **Add Auth Middleware:** Protect admin routes with authentication
5. **Payment Integration:** Add Stripe or Razorpay

## Useful Commands

```bash
# Start development server
npm run dev

# Seed database with mock data
npm run seed

# Start production server
npm start

# Check Node version
node --version

# Check npm version
npm --version
```

## Project Structure

```
backend/
├── server.js           # Main entry point
├── .env               # Environment variables
├── package.json       # Dependencies
├── seed.js            # Database seeding script
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   ├── User.js
│   ├── Restaurant.js
│   ├── FoodItem.js
│   └── Order.js
├── controllers/
│   ├── authController.js
│   ├── restaurantController.js
│   ├── foodController.js
│   └── orderController.js
├── routes/
│   ├── authRoutes.js
│   ├── restaurantRoutes.js
│   ├── foodRoutes.js
│   └── orderRoutes.js
├── middleware/
│   ├── auth.js        # JWT authentication
│   ├── upload.js      # Image upload handler
│   └── errorHandler.js
├── data/
│   └── mockData.js    # Sample data
└── uploads/           # Uploaded images

```

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/food-delivery` |
| `JWT_SECRET` | Token encryption key | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Support

- **Documentation:** See `README.md` and `API_DOCUMENTATION.md`
- **Issues:** Check MongoDB connection, Node.js version, ports
- **Debugging:** Check server logs in terminal

## Happy Coding! 🚀

Once the backend is running, update your frontend to connect:

```javascript
// Frontend API configuration
const API_URL = 'http://localhost:5000/api';
```
