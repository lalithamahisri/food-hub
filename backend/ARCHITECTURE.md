# Project Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│                    (c:\frontend\src\...)                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │ (Axios/Fetch)
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Backend Server (Node.js/Express)              │
│                   http://localhost:5000                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    API Router                           │  │
│  │  /auth  /restaurants  /food  /orders                   │  │
│  └────────────┬───────────────────────────┬────────────────┘  │
│               │                           │                    │
│  ┌────────────↓──────────┐  ┌────────────↓──────────┐         │
│  │  Controllers          │  │  Middleware           │         │
│  ├───────────────────────┤  ├───────────────────────┤         │
│  │ • authController      │  │ • auth.js (JWT)       │         │
│  │ • restaurantCtrl      │  │ • upload.js (Multer)  │         │
│  │ • foodController      │  │ • errorHandler.js     │         │
│  │ • orderController     │  │                       │         │
│  └────────────┬──────────┘  └───────────────────────┘         │
│               │                                                 │
│  ┌────────────↓──────────────────────────┐                    │
│  │  Models (Mongoose Schemas)            │                    │
│  ├───────────────────────────────────────┤                    │
│  │ • User.js                             │                    │
│  │ • Restaurant.js                       │                    │
│  │ • FoodItem.js                         │                    │
│  │ • Order.js                            │                    │
│  └────────────┬──────────────────────────┘                    │
│               │                                                 │
└───────────────┼─────────────────────────────────────────────────┘
                │
                │ MongoDB Queries
                │
                ↓
┌─────────────────────────────────────────────────────────────────┐
│                  MongoDB Database                               │
│                  food-delivery (Collection)                     │
│  ┌──────────────────────────────────────────────────┐          │
│  │ Collections:                                     │          │
│  │ • users          (user accounts)                │          │
│  │ • restaurants    (restaurant info + image URL)  │          │
│  │ • fooditems      (food items + image URL)       │          │
│  │ • orders         (order history)                │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  File Storage                                   │
│  ┌──────────────────────────────────────────────────┐          │
│  │ uploads/                                         │          │
│  │ ├── restaurant-images.jpg                       │          │
│  │ ├── food-images.jpg                             │          │
│  │ └── profile-images.jpg                          │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  Also supports external URLs:                                  │
│  • Unsplash images (mock data)                                 │
│  • Cloud storage (Future: S3, Cloudinary)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Example: User Creates an Order

```
1. Frontend
   ├─ User clicks "Place Order"
   └─ Sends: POST /api/orders
      └─ Body: { restaurantId, items, deliveryAddress }
         Header: Authorization: Bearer <JWT_TOKEN>

2. Backend Route Handler
   └─ routes/orderRoutes.js
      └─ Calls: POST /

3. Authentication Middleware
   └─ middleware/auth.js
      ├─ Validates JWT token
      ├─ Extracts userId
      └─ Passes to controller

4. Controller
   └─ controllers/orderController.js
      └─ createOrder()
         ├─ Validates restaurant exists
         ├─ Validates food items exist
         ├─ Calculates totals
         └─ Creates order object

5. Model
   └─ models/Order.js
      └─ new Order(data)
         └─ order.save()

6. Database
   └─ MongoDB
      └─ Stores order document
         ├─ orderId
         ├─ userId
         ├─ items[]
         ├─ status: "pending"
         └─ timestamps

7. Response
   └─ Return to Frontend
      ├─ 201 Created
      └─ { success: true, data: order }

8. Frontend
   └─ Update UI
      ├─ Show order confirmation
      └─ Redirect to order tracking
```

---

## Data Models Relationships

```
┌─────────────┐         ┌─────────────────┐
│   User      │         │  Restaurant     │
├─────────────┤         ├─────────────────┤
│ _id         │         │ _id             │
│ firstName   │         │ name            │
│ lastName    │         │ description     │
│ email       │         │ image           │
│ password    │         │ rating          │
│ phone       │         │ deliveryTime    │
│ address     │         │ deliveryFee     │
│ profileImg  │         │ cuisineType[]   │
└─────┬───────┘         └────────┬────────┘
      │                          │
      │         Orders           │    1:N
      │         ┌──────────┐     │
      │    1:N  │          │     │
      ├────────→│  Order   │     │
      │         │          │     │
      │    N:1  │ _id      │←────┘
      │         │ userId   │
      │         │ restaur. │
      │         │ items[]  │
      │         └────┬─────┘
      │              │ 1:N
      │              │
└──────────────────────┘
                       │
                       ↓
            ┌──────────────────┐
            │   FoodItem       │
            ├──────────────────┤
            │ _id              │
            │ name             │
            │ description      │
            │ price            │
            │ restaurantId     │
            │ image            │
            │ category         │
            │ rating           │
            │ isVegetarian     │
            │ preparationTime  │
            └──────────────────┘
```

---

## File & Directory Structure

```
backend/
│
├── 📄 Configuration Files
│   ├── server.js              # Main server entry point
│   ├── package.json           # Project dependencies
│   ├── .env                   # Environment variables (secret)
│   ├── .env.example           # Environment template
│   └── .gitignore             # Git ignore rules
│
├── 📁 config/
│   └── db.js                  # MongoDB connection
│
├── 📁 models/                 # Mongoose Schemas
│   ├── User.js                # User schema
│   ├── Restaurant.js          # Restaurant schema
│   ├── FoodItem.js            # Food items schema
│   └── Order.js               # Orders schema
│
├── 📁 controllers/            # Business logic
│   ├── authController.js      # Auth endpoints
│   ├── restaurantController.js # Restaurant CRUD
│   ├── foodController.js      # Food items CRUD + search
│   └── orderController.js     # Order management
│
├── 📁 routes/                 # API endpoints
│   ├── authRoutes.js          # /api/auth
│   ├── restaurantRoutes.js    # /api/restaurants
│   ├── foodRoutes.js          # /api/food
│   └── orderRoutes.js         # /api/orders
│
├── 📁 middleware/             # Express middleware
│   ├── auth.js                # JWT authentication
│   ├── upload.js              # Image upload (Multer)
│   └── errorHandler.js        # Error handling
│
├── 📁 data/
│   └── mockData.js            # Sample data (6 restaurants, 18 items)
│
├── 📁 uploads/                # Uploaded images (auto-created)
│   └── [restaurant/food/profile images]
│
└── 📄 Documentation
    ├── README.md              # Full documentation
    ├── QUICKSTART.md          # 5-minute setup
    ├── API_DOCUMENTATION.md   # Detailed API reference
    ├── IMAGES_REFERENCE.md    # Image sources & usage
    └── SETUP_SUMMARY.md       # Project setup overview
```

---

## API Layer Architecture

```
Request Flow:

Client → Express App → Routes → Middleware → Controller → Model → DB
                ↑         ↑         ↑            ↑         ↑       ↑
                │         │         │            │         │       │
          Routing      Path      Data       Business   Schema   CRUD
          Rules      Matching   Validation  Logic    Definition Ops


Example: POST /api/restaurants

1. express.Router() 
   └─ Matches POST route

2. middleware/upload.js
   └─ Handles file upload (if present)

3. middleware/auth.js (if needed)
   └─ Validates JWT token

4. controllers/restaurantController.js
   └─ createRestaurant()
      ├─ Validate input
      ├─ Prepare data
      └─ Call model

5. models/Restaurant.js
   └─ new Restaurant(data)
      └─ schema validation

6. MongoDB
   └─ Persist to database

7. Response sent back to client
```

---

## Image Upload Flow

```
User Selects Image
        │
        ↓
Frontend Form
    (multipart/form-data)
        │
        ↓
Backend Express App
        │
        ↓
Multer Middleware (middleware/upload.js)
    ├─ Disk Storage
    ├─ File size check (max 10MB)
    ├─ File type validation (JPEG, PNG, GIF, WebP)
    ├─ Rename with timestamp + random suffix
        │
        ↓
    Save to /backend/uploads/
        │
        ↓
Controller Handler
    ├─ Verify other data
    └─ Store path in database

        │
        ↓
    Response with image path
        │
        ↓
Frontend receives:
    {
      "image": "/uploads/filename-timestamp.jpg"
    }
        │
        ↓
Display image:
    img src="http://localhost:5000/uploads/filename.jpg"
```

---

## Authentication Flow (JWT)

```
User Login
    │
    ↓
POST /api/auth/login
├─ Email, Password
    │
    ↓
authController.login()
├─ Find user in DB
├─ Compare password (bcrypt)
├─ If valid:
└─ Create JWT Token
    │
    ↓
jwt.sign({userId}, SECRET, {expiresIn: '7d'})
    │
    ↓
Return Token to Frontend
    │
    ├─ Store in localStorage
    ├─ Store in state
    └─ Or send via cookie
    │
    ↓
Subsequent Requests
    │
    ├─ Add token to header:
    │  Authorization: Bearer <token>
    │
    ↓
middleware/auth.js
├─ Extract token from header
├─ Verify token signature
├─ Check expiration
├─ If valid: Extract userId
├─ Attach userId to request
    │
    ↓
Controller accesses req.userId
    │
    ├─ Use to fetch user-specific data
    ├─ Ensure user can only access own data
    │
    ↓
Database operations
└─ Return user-specific results
```

---

## Search & Filter Flow

```
Frontend Search Input
        │
        ↓
GET /api/food/search?query=pizza
        │
        ↓
foodController.searchFoodItems()
├─ Extract query parameter
├─ MongoDB search:
│  db.fooditems.find({
│    $or: [
│      { name: { $regex: query, $options: 'i' } },
│      { description: { $regex: query } },
│      { category: { $regex: query } }
│    ]
│  })
│
└─ Return matching results
        │
        ↓
Frontend receives:
[
  { name: "Pepperoni Pizza" },
  { name: "Margherita Pizza" }
]
        │
        ↓
Display in UI
```

---

## Order Status Progression

```
User Places Order
    ↓
Status: pending → Server receives order
    ↓
Status: confirmed → Restaurant confirms
    ↓
Status: preparing → Food being prepared
    ↓
Status: out-for-delivery → Delivery started
    ↓
Status: delivered → Order reached user
    ↓
User can rate/review

OR anytime:
    ↓
Status: cancelled → Order cancelled
```

---

## Error Handling Flow

```
Request comes in
    │
    ↓
Try-Catch Block
    │
    ├─ Success: Return 200/201
    │
    └─ Error:
        ├─ Validation Error → 400
        ├─ Not Found Error → 404
        ├─ Auth Error → 401
        ├─ Permission Error → 403
        └─ Server Error → 500
            │
            ↓
    Exception caught by errorHandler
    middleware/errorHandler.js
            │
            ↓
    Return JSON error response:
    {
      "success": false,
      "message": "Error description",
      "status": 400
    }
            │
            ↓
    Frontend displays error
```

---

## Environment & Configuration

```
.env file (kept secret, not in git)
├─ PORT=5000
├─ MONGODB_URI=mongodb://...
├─ JWT_SECRET=secret_key_here
└─ NODE_ENV=development

server.js reads from .env
    │
    ├─ Uses different configs for dev/prod
    └─ Protects sensitive data

Production setup:
├─ Use environment variables from hosting platform
├─ Set JWT_SECRET to strong random value
├─ Use cloud MongoDB (MongoDB Atlas)
├─ Enable HTTPS/SSL
└─ Setup monitoring & logging
```

---

## Key Concepts

### Separation of Concerns
- **Routes:** URL patterns and HTTP methods
- **Controllers:** Business logic and request handling
- **Models:** Database schema and validation
- **Middleware:** Cross-cutting concerns (auth, error handling)

### RESTful API Principles
```
GET    /api/restaurants       # Get all
POST   /api/restaurants       # Create
GET    /api/restaurants/:id   # Get one
PUT    /api/restaurants/:id   # Update
DELETE /api/restaurants/:id   # Delete
```

### Middleware Pipeline
```
Request
  ↓
CORS Middleware
  ↓
Body Parser Middleware
  ↓
Authentication Middleware (if needed)
  ↓
File Upload Middleware (if needed)
  ↓
Route Handler → Controller
  ↓
Error Handler Middleware
  ↓
Response
```

---

## Next Steps

1. **Understand Flow:** Follow a request from client → server → DB
2. **Run Server:** `npm run seed` then `npm run dev`
3. **Test Endpoints:** Use API_DOCUMENTATION.md
4. **Connect Frontend:** Update frontend API URL
5. **Explore Code:** Read controllers to understand business logic
6. **Deploy:** Use cloud platforms for production

---

## Technology Stack Visualization

```
                    MERN Stack
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ↓               ↓               ↓
    Frontend        Backend         Database
    (React)         (Express.js)     (MongoDB)
        │               │               │
    ├─ JSX          ├─ HTTP/REST   ├─ Collections
    ├─ Components   ├─ Routing     ├─ Documents
    ├─ State        ├─ Middleware  ├─ Queries
    ├─ Context API  ├─ Controllers ├─ Validation
    └─ Axios        ├─ Models      └─ Indexing
                    ├─ Mongoose
                    ├─ JWT Auth
                    └─ File Uploads

Supporting Tools:
├─ Node.js (Runtime)
├─ npm (Package Manager)
├─ Multer (File Upload)
├─ Bcryptjs (Password Hashing)
├─ jsonwebtoken (JWT)
└─ CORS (Cross-Origin)
```

---

This architecture provides:
✅ Clean, maintainable code
✅ Separation of concerns
✅ Easy to test and debug
✅ Scalable structure
✅ RESTful API standards compliance
