# API Documentation - Food Delivery Backend

Complete guide to all API endpoints with examples

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require a JWT token. Include it in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

---

## 1. Authentication Endpoints

### Register User
Create a new user account

**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "phone": "9876543210"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "phone": "9876543210"
  }'
```

---

### Login User
Authenticate and receive JWT token

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

---

### Get User Profile
Retrieve authenticated user's profile

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "profileImage": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

---

### Update User Profile
Update user information and profile picture

**Endpoint:** `PUT /auth/profile`

**Form Data:**
```
firstName: John
lastName: Smith
phone: 9999999999
address[street]: 456 Oak Ave
address[city]: New York
address[state]: NY
address[zipCode]: 10002
address[country]: USA
profileImage: <image_file>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "9999999999",
    "profileImage": "/uploads/profileImage-1705308600000-123456789.jpg"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <token>" \
  -F "firstName=John" \
  -F "lastName=Smith" \
  -F "phone=9999999999" \
  -F "profileImage=@/path/to/image.jpg"
```

---

## 2. Restaurant Endpoints

### Get All Restaurants
Retrieve list of all restaurants

**Endpoint:** `GET /restaurants`

**Query Parameters:**
```
None
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Pizza Palace",
      "description": "Authentic Italian pizzeria",
      "cuisineType": ["Italian", "Pizza"],
      "rating": 4.8,
      "deliveryTime": 25,
      "deliveryFee": 50,
      "minOrderAmount": 200,
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      "isOpen": true,
      "totalOrders": 1250
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/restaurants
```

---

### Get Restaurant Details
Get specific restaurant with all food items

**Endpoint:** `GET /restaurants/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Pizza Palace",
      "description": "Authentic Italian pizzeria",
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47"
    },
    "foodItems": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Margherita Pizza",
        "price": 450,
        "image": "https://images.unsplash.com/photo-1599271487039-0c4517302212"
      }
    ]
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/restaurants/507f1f77bcf86cd799439012
```

---

### Create Restaurant
Add new restaurant (with image)

**Endpoint:** `POST /restaurants`

**Form Data:**
```
name: Pizza Palace
description: Authentic Italian pizzeria with wood-fired ovens
cuisineType: Italian,Pizza
phone: 212-555-0100
email: info@pizzapalace.com
address[street]: 123 Main Street
address[city]: New York
address[state]: NY
address[zipCode]: 10001
address[country]: USA
openingHours[open]: 11:00 AM
openingHours[close]: 11:00 PM
image: <image_file>
```

**Response (201):**
```json
{
  "success": true,
  "message": "Restaurant created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pizza Palace",
    "image": "/uploads/image-1705308600000-123456789.jpg"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/restaurants \
  -F "name=Pizza Palace" \
  -F "description=Authentic Italian pizzeria" \
  -F "cuisineType=Italian,Pizza" \
  -F "phone=212-555-0100" \
  -F "email=info@pizzapalace.com" \
  -F "image=@/path/to/restaurant.jpg"
```

---

### Update Restaurant
Modify existing restaurant details

**Endpoint:** `PUT /restaurants/:id`

**Form Data:**
```
name: Pizza Palace Updated
rating: 4.9
deliveryFee: 60
image: <new_image_file>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Restaurant updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pizza Palace Updated",
    "rating": 4.9
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/restaurants/507f1f77bcf86cd799439012 \
  -F "name=Pizza Palace Updated" \
  -F "rating=4.9" \
  -F "image=@/path/to/new_image.jpg"
```

---

### Delete Restaurant
Remove restaurant and all associated food items

**Endpoint:** `DELETE /restaurants/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Restaurant deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/restaurants/507f1f77bcf86cd799439012
```

---

## 3. Food Items Endpoints

### Get All Food Items
Retrieve all food items from all restaurants

**Endpoint:** `GET /food`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Margherita Pizza",
      "description": "Classic Italian pizza",
      "price": 450,
      "category": "Pizza",
      "image": "https://images.unsplash.com/photo-1599271487039-0c4517302212",
      "rating": 4.9,
      "isVegetarian": true
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/food
```

---

### Get Food Items by Restaurant
Get all food items for specific restaurant

**Endpoint:** `GET /food/restaurant/:restaurantId`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Margherita Pizza",
      "price": 450,
      "image": "https://images.unsplash.com/photo-1599271487039-0c4517302212"
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/food/restaurant/507f1f77bcf86cd799439012
```

---

### Search Food Items
Search food by name, description, or category

**Endpoint:** `GET /food/search?query=pizza`

**Query Parameters:**
```
query: search term (required)
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Margherita Pizza",
      "price": 450
    }
  ]
}
```

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/food/search?query=pizza"
```

---

### Get Single Food Item
Retrieve details of specific food item

**Endpoint:** `GET /food/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with fresh mozzarella",
    "price": 450,
    "category": "Pizza",
    "image": "https://images.unsplash.com/photo-1599271487039-0c4517302212",
    "rating": 4.9,
    "isVegetarian": true,
    "preparationTime": 20,
    "available": true
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/food/507f1f77bcf86cd799439013
```

---

### Create Food Item
Add new food item with image

**Endpoint:** `POST /food`

**Form Data:**
```
name: Margherita Pizza
description: Classic Italian pizza with fresh mozzarella
price: 450
restaurantId: 507f1f77bcf86cd799439012
category: Pizza
isVegetarian: true
isNonVegetarian: false
preparationTime: 20
image: <image_file>
```

**Response (201):**
```json
{
  "success": true,
  "message": "Food item created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Margherita Pizza",
    "price": 450,
    "image": "/uploads/image-1705308600000-123456789.jpg"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/food \
  -F "name=Margherita Pizza" \
  -F "description=Classic Italian pizza with fresh mozzarella" \
  -F "price=450" \
  -F "restaurantId=507f1f77bcf86cd799439012" \
  -F "category=Pizza" \
  -F "isVegetarian=true" \
  -F "preparationTime=20" \
  -F "image=@/path/to/pizza.jpg"
```

---

### Update Food Item
Modify existing food item

**Endpoint:** `PUT /food/:id`

**Form Data:**
```
price: 500
rating: 5.0
available: true
```

**Response (200):**
```json
{
  "success": true,
  "message": "Food item updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "price": 500,
    "rating": 5.0
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/food/507f1f77bcf86cd799439013 \
  -F "price=500" \
  -F "rating=5.0"
```

---

### Delete Food Item
Remove food item

**Endpoint:** `DELETE /food/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Food item deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/food/507f1f77bcf86cd799439013
```

---

## 4. Orders Endpoints

### Create Order
Place new order

**Endpoint:** `POST /orders`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "restaurantId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "foodItemId": "507f1f77bcf86cd799439013",
      "quantity": 2
    },
    {
      "foodItemId": "507f1f77bcf86cd799439014",
      "quantity": 1
    }
  ],
  "deliveryAddress": {
    "street": "789 Oak Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10003",
    "country": "USA"
  },
  "paymentMethod": "cod",
  "notes": "Extra oregano please"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "orderId": "ORD-1705308600000-abc123def",
    "userId": "507f1f77bcf86cd799439011",
    "restaurantId": "507f1f77bcf86cd799439012",
    "restaurantName": "Pizza Palace",
    "totalAmount": 950,
    "deliveryFee": 50,
    "finalAmount": 1000,
    "status": "pending",
    "paymentStatus": "pending",
    "estimatedDeliveryTime": 25,
    "items": [
      {
        "name": "Margherita Pizza",
        "price": 450,
        "quantity": 2,
        "total": 900
      }
    ]
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "foodItemId": "507f1f77bcf86cd799439013",
        "quantity": 2
      }
    ],
    "deliveryAddress": {
      "street": "789 Oak Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10003"
    },
    "paymentMethod": "cod"
  }'
```

---

### Get User Orders
Retrieve all orders for authenticated user

**Endpoint:** `GET /orders/user/my-orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "orderId": "ORD-1705308600000-abc123def",
      "restaurantName": "Pizza Palace",
      "totalAmount": 950,
      "finalAmount": 1000,
      "status": "delivered",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders/user/my-orders \
  -H "Authorization: Bearer <token>"
```

---

### Get Order Details
Retrieve specific order information

**Endpoint:** `GET /orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "orderId": "ORD-1705308600000-abc123def",
    "restaurantName": "Pizza Palace",
    "items": [
      {
        "name": "Margherita Pizza",
        "price": 450,
        "quantity": 2,
        "total": 900
      }
    ],
    "totalAmount": 950,
    "deliveryFee": 50,
    "finalAmount": 1000,
    "status": "delivered",
    "paymentStatus": "completed",
    "estimatedDeliveryTime": 25
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders/507f1f77bcf86cd799439015 \
  -H "Authorization: Bearer <token>"
```

---

### Update Order Status
Change order status (admin)

**Endpoint:** `PUT /orders/:id/status`

**Request:**
```json
{
  "status": "preparing"
}
```

**Valid Statuses:**
- `pending` - Order received
- `confirmed` - Order confirmed
- `preparing` - Food being prepared
- `out-for-delivery` - On the way
- `delivered` - Order delivered
- `cancelled` - Order cancelled

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "status": "preparing"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/orders/507f1f77bcf86cd799439015/status \
  -H "Content-Type: application/json" \
  -d '{"status": "preparing"}'
```

---

### Rate Order
Add rating and review to completed order

**Endpoint:** `PUT /orders/:id/rate`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "rating": 5,
  "review": "Excellent food and fast delivery!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order rated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "rating": 5,
    "review": "Excellent food and fast delivery!"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/orders/507f1f77bcf86cd799439015/rate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "review": "Excellent food and fast delivery!"
  }'
```

---

### Get All Orders
Retrieve all orders (admin)

**Endpoint:** `GET /orders`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "orderId": "ORD-1705308600000-abc123def",
      "userId": "507f1f77bcf86cd799439011",
      "restaurantName": "Pizza Palace",
      "finalAmount": 1000,
      "status": "delivered"
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Testing the API

### Using Postman
1. Import the collection using the endpoints above
2. Set `Authorization` header to `Bearer <token>` for protected routes
3. Use `form-data` for file uploads
4. Use `raw JSON` for other requests

### Using cURL
See examples above for each endpoint

### Using JavaScript/Fetch
```javascript
// Example: Create Order
const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    restaurantId: '...',
    items: [...],
    deliveryAddress: {...},
    paymentMethod: 'cod'
  })
});

const data = await response.json();
console.log(data);
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production.

## CORS

CORS is enabled for all origins. Restrict in production:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```
