# 🚀 How to See the Changes

## The Problem
Your frontend was using mock placeholder data. Now it's connected to your backend which has:
- **6 beautiful restaurants** with Unsplash images
- **18 delicious food items** with high-quality images
- **Real data from MongoDB**

## Steps to See It Working

### 1️⃣ Start the Backend (First!)

Open a terminal and run:
```bash
cd backend
npm install        # If you haven't done this yet
npm run seed       # Load mock data (6 restaurants + 18 items)
npm run dev        # Start backend server
```

**You should see:**
```
Server running on port 5000
Environment: development
API Health: http://localhost:5000/api/health
MongoDB Connected
```

### 2️⃣ Start the Frontend

Open another terminal and run:
```bash
cd frontend
npm run dev
```

**You should see:**
```
VITE v... ready in XXX ms
Local: http://localhost:5173/
```

### 3️⃣ Open Your Browser

Go to: **http://localhost:5173/**

You should now see:
- ✅ **6 Real Restaurants** with images:
  - Pizza Palace
  - Burger Bistro
  - Wok Express
  - Sushi Sensation
  - Taco Fiesta
  - Curry House

- ✅ **Beautiful Unsplash images** for each restaurant
- ✅ **Cuisine filters** that actually work
- ✅ **18 Food items** when you click on a restaurant

---

## 🔧 If You Don't See the Restaurants

### Error: "Unable to connect to server"
- Make sure backend is running on port 5000
- Run: `npm run dev` from the backend folder
- Check the browser console (F12) for errors

### Error: "CORS error"
- Your browser might be blocking the request
- Make sure backend server is running first
- Refresh the page

### Still seeing old mock data?
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Clear browser cache
- Check the browser console for errors (F12)

---

## 📊 What's Connected Now

✅ **Home Page** → Fetches from `GET /api/restaurants`
✅ **Restaurant Detail** → Fetches from `GET /api/restaurants/:id`
✅ **Food Items** → Displayed from restaurant's food items
✅ **Images** → Using real Unsplash URLs from backend

---

## 🧪 Quick Test

### Test 1: Check if API is working
Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

### Test 2: Get restaurants from API
Open your browser and go to:
```
http://localhost:5000/api/restaurants
```

You should see JSON with all 6 restaurants and their images!

---

## 📁 What Changed in Frontend

**New files:**
- `src/services/api.js` - API configuration

**Updated files:**
- `src/pages/Home/Home.jsx` - Now fetches restaurants from backend
- `src/pages/RestaurantDetail/RestaurantDetail.jsx` - Now fetches restaurant + food items
- `src/components/RestaurantCard/RestaurantCard.jsx` - Updated for new data structure
- `src/components/FoodCard/FoodCard.jsx` - Updated for new data structure

---

## 🎯 Next Steps

1. See the restaurants and food items displaying ✅
2. Click on a restaurant to see the menu
3. Add items to cart
4. Create an account / Login
5. Place an order

---

## 💡 Commands Reference

```bash
# Backend
cd backend
npm install                 # Install dependencies
npm run seed              # Load sample data
npm run dev               # Start development server

# Frontend  
cd frontend
npm run dev               # Start development server
npm run build             # Build for production
```

---

## 🆘 Still Having Issues?

1. **Make sure both servers are running:**
   - Backend: `http://localhost:5000` (check terminal shows "Server running on port 5000")
   - Frontend: `http://localhost:5173` (check terminal shows "Local: http://localhost:5173...")

2. **Check the browser console:** Press F12 and look for errors

3. **Verify MongoDB is running:**
   - If using local MongoDB, make sure it's started
   - If using MongoDB Atlas, check your connection string in `.env`

4. **Check if seeding worked:**
   The backend terminal should show:
   ```
   MongoDB Connected
   Cleared existing data
   6 restaurants inserted
   18 food items inserted
   Database seeded successfully!
   ```

---

## 📱 The App Now Has

✅ Real restaurant data from MongoDB  
✅ Real food item data from MongoDB  
✅ Beautiful Unsplash images  
✅ Functional restaurant filtering  
✅ Click-through to food menus  
✅ Add to cart functionality  
✅ Backend API integration  

---

## 🎉 You're All Set!

Your food delivery app now has:
- **Frontend** connected to **Backend**
- **Backend** connected to **MongoDB**
- **6 restaurants** with **18 food items** ready to display

Enjoy! 🍕🍔🍜
