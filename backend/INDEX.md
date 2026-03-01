# Backend Documentation Index

Welcome! Here's your complete guide to the Food Delivery Backend.

---

## 🚀 Getting Started (Start Here!)

### First Time Setup? Follow this order:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡
   - 5-minute setup guide
   - Install, configure, run
   - Quick testing

2. **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** 📋
   - What was created?
   - Project overview
   - Technology stack
   - Next steps

3. **Start the server:** `npm run dev`

---

## 📚 Complete Documentation

### Framework & Setup
- **[README.md](README.md)** - Full project documentation with features
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** - Complete setup overview

### API Reference
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - All endpoints with examples
  - Auth endpoints
  - Restaurant endpoints
  - Food items endpoints
  - Order endpoints
  - cURL, JSON examples

### Architecture & Design
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and data flow
  - Data models relationships
  - Request flow examples
  - Image upload flow
  - Authentication flow
  - Error handling flow

### Resources
- **[IMAGES_REFERENCE.md](IMAGES_REFERENCE.md)** - Image sources and usage
  - Unsplash images used
  - Upload documentation
  - Cloud storage recommendations

---

## 🎯 Quick Navigation

### I want to...

#### Start the server
```bash
npm install          # Install dependencies
npm run seed        # Load sample data (optional)
npm run dev         # Start server
```
👉 See: [QUICKSTART.md](QUICKSTART.md)

#### Test the API
```bash
curl http://localhost:5000/api/health
```
👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

#### Register a user
```bash
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```
👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md#register-user)

#### Create a restaurant with image
```bash
POST /api/restaurants
-F "name=Pizza Palace"
-F "description=Italian pizzeria"
-F "image=@/path/to/image.jpg"
```
👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md#create-restaurant)

#### Search for food items
```bash
GET /api/food/search?query=pizza
```
👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md#search-food-items)

#### Place an order
```bash
POST /api/orders
Authorization: Bearer <token>
{
  "restaurantId": "...",
  "items": [...],
  "deliveryAddress": {...},
  "paymentMethod": "cod"
}
```
👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md#create-order)

#### Understand the architecture
👉 See: [ARCHITECTURE.md](ARCHITECTURE.md)

#### Upload images
👉 See: [IMAGES_REFERENCE.md](IMAGES_REFERENCE.md)

#### Deploy to production
👉 See: [README.md](README.md#production-deployment)

---

## 📁 Project Files

### Configuration
- `server.js` - Main server file
- `package.json` - Dependencies
- `.env` - Environment variables
- `.gitignore` - Git ignore rules

### Core Application
- `config/db.js` - MongoDB connection
- `models/` - Database schemas
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/` - Auth, uploads, errors

### Data & Documentation
- `data/mockData.js` - Sample data
- `seed.js` - Database seeding
- `uploads/` - User-uploaded images
- `*.md` - Documentation files

---

## 🔗 Database Connection

### MongoDB Setup

**Option 1: MongoDB Atlas (Cloud) - Recommended**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` with connection string

**Option 2: Local MongoDB**
1. Install MongoDB
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/food-delivery`

👉 See: [QUICKSTART.md](QUICKSTART.md#step-2-setup-mongodb)

---

## 🛡️ Security Notes

### Current Status
- ✅ JWT authentication implemented
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled
- ⚠️ No rate limiting (add for production)
- ⚠️ All routes accessible (add admin checks for production)

### For Production
- [ ] Add environment-specific CORS config
- [ ] Implement rate limiting
- [ ] Add admin authentication middleware
- [ ] Use HTTPS/SSL
- [ ] Store files in cloud (S3, Cloudinary)
- [ ] Add request validation
- [ ] Setup logging and monitoring
- [ ] Use environment secrets management

👉 See: [README.md](README.md#security)

---

## 📊 Data Models

### User
```
{
  _id, firstName, lastName, email, password (hashed),
  phone, address, profileImage, timestamps
}
```

### Restaurant
```
{
  _id, name, description, cuisineType, rating, 
  deliveryTime, deliveryFee, minOrderAmount, image,
  address, phone, email, openingHours, isOpen, totalOrders, timestamps
}
```

### FoodItem
```
{
  _id, name, description, price, restaurantId,
  category, image, rating, isVegetarian, preparationTime,
  totalOrders, available, timestamps
}
```

### Order
```
{
  _id, orderId (unique), userId, restaurantId, items[],
  totalAmount, deliveryFee, finalAmount, deliveryAddress,
  status, paymentStatus, paymentMethod, transactionId,
  rating, review, timestamps
}
```

👉 See: [ARCHITECTURE.md](ARCHITECTURE.md#data-models-relationships)

---

## 🔌 API Endpoints Summary

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Restaurants
- `GET /api/restaurants` - List all
- `GET /api/restaurants/:id` - Get with food items
- `POST /api/restaurants` - Create
- `PUT /api/restaurants/:id` - Update
- `DELETE /api/restaurants/:id` - Delete

### Food Items
- `GET /api/food` - List all
- `GET /api/food/:id` - Get single
- `GET /api/food/restaurant/:restaurantId` - By restaurant
- `GET /api/food/search?query=x` - Search
- `POST /api/food` - Create
- `PUT /api/food/:id` - Update
- `DELETE /api/food/:id` - Delete

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - User's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update status
- `PUT /api/orders/:id/rate` - Rate order

👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🧪 Testing

### Using Postman
1. Download Postman
2. Create requests using [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Set Authorization header for protected routes
4. Use form-data for file uploads

### Using cURL
```bash
# Get restaurants
curl http://localhost:5000/api/restaurants

# Get health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"123456","phone":"9876543210"}'
```

### Using JavaScript
```javascript
const response = await fetch('http://localhost:5000/api/restaurants');
const data = await response.json();
console.log(data);
```

👉 See: [API_DOCUMENTATION.md](API_DOCUMENTATION.md#testing-the-api)

---

## 🐛 Troubleshooting

### Server won't start
```
Error: listen EADDRINUSE
→ Port 5000 already in use. Change in .env to PORT=5001
→ Or kill process: lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill
```

### MongoDB connection error
```
Error: connect ECONNREFUSED
→ MongoDB not running
→ Check connection string in .env
→ If using MongoDB Atlas, check IP whitelist
```

### Image upload fails
```
Error: File type not allowed
→ Use JPEG, PNG, GIF, or WebP
→ Max file size: 10MB
```

### Authentication error
```
Error: Token is not valid
→ Verify token format: Bearer <token>
→ Token expires in 7 days
→ Re-login for new token
```

👉 See: [QUICKSTART.md](QUICKSTART.md#common-issues--solutions)

---

## 📈 Next Steps

### Phase 1: Understanding
- [ ] Read [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
- [ ] Review [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Understand data models

### Phase 2: Running
- [ ] Setup MongoDB
- [ ] Run `npm install`
- [ ] Run `npm run seed`
- [ ] Start server: `npm run dev`

### Phase 3: Testing
- [ ] Test endpoints with cURL
- [ ] Use Postman for manual testing
- [ ] Verify image uploads work

### Phase 4: Integration
- [ ] Update frontend API URL
- [ ] Connect frontend to backend
- [ ] Test full flow
- [ ] Fix any issues

### Phase 5: Enhancement
- [ ] Add payment gateway
- [ ] Implement admin features
- [ ] Add real-time updates
- [ ] Deploy to production

---

## 🚀 Deployment

### Quick Deploy Options

**Heroku**
1. Create Heroku account
2. Install Heroku CLI
3. `heroku create food-delivery-api`
4. Add MongoDB Atlas connection
5. `git push heroku main`

**Railway**
1. Connect GitHub repo
2. Add MongoDB Atlas connection
3. Deploy

**Render**
1. Connect GitHub repo
2. Set environment variables
3. Deploy

👉 See: [README.md](README.md)

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **Mongoose:** https://mongoosejs.com/
- **REST API:** https://restfulapi.net/
- **JWT:** https://jwt.io/
- **Postman:** https://www.postman.com/

---

## ✅ Checklist

### Server Setup
- [ ] Node.js installed
- [ ] MongoDB configured
- [ ] `.env` file set up
- [ ] Dependencies installed: `npm install`
- [ ] Database seeded: `npm run seed`
- [ ] Server running: `npm run dev`

### API Testing
- [ ] Health check working
- [ ] Can register user
- [ ] Can get restaurants
- [ ] Can get food items
- [ ] Image uploads working

### Frontend Integration
- [ ] API URL configured
- [ ] Can fetch data
- [ ] Can create orders
- [ ] Can authenticate
- [ ] Images loading

### Production Ready
- [ ] Error handling complete
- [ ] Validation implemented
- [ ] Security checks added
- [ ] Environment config set
- [ ] Database backups enabled
- [ ] Monitoring configured
- [ ] Deployed and running

---

## 📞 Support

### Issues?
1. Check [QUICKSTART.md](QUICKSTART.md#common-issues--solutions)
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md#error-responses)
3. Check server logs: `npm run dev`
4. Verify MongoDB connection
5. Check frontend console for errors

### Questions?
- See [README.md](README.md)
- See [ARCHITECTURE.md](ARCHITECTURE.md)
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 📝 Important Notes

1. **Security:** Change `JWT_SECRET` in production
2. **Images:** Currently stored locally; use cloud storage for production
3. **Database:** Use MongoDB Atlas for production (not local)
4. **CORS:** Currently open to all; restrict in production
5. **Admin:** Add admin authentication middleware in production

---

## 🎉 You're All Set!

Your complete Food Delivery Backend is ready to use!

### Start Now:
```bash
npm install       # Install
npm run seed     # Load sample data
npm run dev      # Run server
```

### Then Test:
```bash
curl http://localhost:5000/api/health
```

### Documentation:
- **Quick Setup:** [QUICKSTART.md](QUICKSTART.md)
- **API Reference:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)

Happy Coding! 🚀
