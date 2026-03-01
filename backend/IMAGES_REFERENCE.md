# Mock Data Images Reference

This document lists all the images used in the mock data and their sources.

All images are sourced from **Unsplash** (https://unsplash.com) - Free high-quality images.

## Restaurant Images

### 1. Pizza Palace
- **URL:** https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop
- **Description:** Italian Pizza
- **Photo by:** [Unsplash]

### 2. Burger Bistro
- **URL:** https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop
- **Description:** Handcrafted Burger
- **Photo by:** [Unsplash]

### 3. Wok Express
- **URL:** https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop
- **Description:** Asian Cuisine - Noodles
- **Photo by:** [Unsplash]

### 4. Sushi Sensation
- **URL:** https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop
- **Description:** Fresh Sushi
- **Photo by:** [Unsplash]

### 5. Taco Fiesta
- **URL:** https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop
- **Description:** Mexican Tacos
- **Photo by:** [Unsplash]

### 6. Curry House
- **URL:** https://images.unsplash.com/photo-1565557623814-695d2c33ffd0?w=500&h=300&fit=crop
- **Description:** Indian Curry Dish
- **Photo by:** [Unsplash]

---

## Food Item Images

### Pizza Palace Items

#### Margherita Pizza
- **URL:** https://images.unsplash.com/photo-1599271487039-0c4517302212?w=400&h=300&fit=crop
- **Category:** Pizza
- **Description:** Classic Italian with mozzarella and basil

#### Pepperoni Supreme
- **URL:** https://images.unsplash.com/photo-1628840042765-356cda07f529?w=400&h=300&fit=crop
- **Category:** Pizza
- **Description:** Premium pepperoni with cheese

#### Vegetarian Delight
- **URL:** https://images.unsplash.com/photo-1506027613408-eca07ce68773?w=400&h=300&fit=crop
- **Category:** Pizza
- **Description:** Mixed vegetables pizza

---

### Burger Bistro Items

#### Classic Cheeseburger
- **URL:** https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop
- **Category:** Burgers
- **Description:** Juicy beef with cheddar

#### Bacon BBQ Burger
- **URL:** https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop
- **Category:** Burgers
- **Description:** Double patty with BBQ sauce

#### Mushroom Swiss Burger
- **URL:** https://images.unsplash.com/photo-1585238341710-4b61c6160b72?w=400&h=300&fit=crop
- **Category:** Burgers
- **Description:** Beef with sautéed mushrooms

---

### Wok Express Items

#### Chicken Fried Rice
- **URL:** https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop
- **Category:** Rice Dishes
- **Description:** Fragrant jasmine rice with chicken

#### Vegetable Lo Mein
- **URL:** https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop
- **Category:** Noodles
- **Description:** Stir-fried noodles with vegetables

#### Beef and Broccoli
- **URL:** https://images.unsplash.com/photo-1609501676725-7186f017a4b6?w=400&h=300&fit=crop
- **Category:** Meat Dishes
- **Description:** Tender beef with crispy broccoli

---

### Sushi Sensation Items

#### California Roll
- **URL:** https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop
- **Category:** Sushi
- **Description:** Crab, avocado, cucumber rolled sushi

#### Spicy Tuna Roll
- **URL:** https://images.unsplash.com/photo-1590539519437-99e2bb9827a8?w=400&h=300&fit=crop
- **Category:** Sushi
- **Description:** Fresh spicy tuna sushi

#### Vegetable Tempura
- **URL:** https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop
- **Category:** Appetizers
- **Description:** Battered and fried vegetables

---

### Taco Fiesta Items

#### Al Pastor Tacos
- **URL:** https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop
- **Category:** Tacos
- **Description:** Marinated pork with pineapple

#### Carne Asada Tacos
- **URL:** https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop
- **Category:** Tacos
- **Description:** Grilled beef with lime

#### Black Bean Tacos
- **URL:** https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop
- **Category:** Tacos
- **Description:** Seasoned black beans

---

### Curry House Items

#### Butter Chicken
- **URL:** https://images.unsplash.com/photo-1565557623814-695d2c33ffd0?w=400&h=300&fit=crop
- **Category:** Curries
- **Description:** Tender chicken in creamy tomato sauce

#### Paneer Tikka Masala
- **URL:** https://images.unsplash.com/photo-1542023783-54c4d3b0a0dd?w=400&h=300&fit=crop
- **Category:** Curries
- **Description:** Cottage cheese in spiced cream sauce

#### Lamb Rogan Josh
- **URL:** https://images.unsplash.com/photo-1585937421612-70a19fb6da4d?w=400&h=300&fit=crop
- **Category:** Curries
- **Description:** Aromatic curry with tender lamb

---

## Image Specifications

- **Format:** JPG/JPEG, PNG, GIF, WebP
- **Size:** Optimized for web (500x300 for restaurants, 400x300 for items)
- **Source:** Unsplash (Free to use, no attribution required)
- **Quality:** High-resolution images
- **License:** Unsplash License (https://unsplash.com/license)

## Using Your Own Images

To use custom images instead of Unsplash URLs:

### Option 1: Upload on Create/Update
```bash
curl -X POST http://localhost:5000/api/restaurants \
  -F "name=My Restaurant" \
  -F "image=@/path/to/my/image.jpg"
```

The image will be saved to `/uploads/` and accessible at `/uploads/filename.jpg`

### Option 2: Update Mock Data
Edit `/backend/data/mockData.js` and replace URLs with your own image paths or URLs.

---

## Image Attribution

All images from Unsplash are used under the [Unsplash License](https://unsplash.com/license):
- Free to download and use
- No permission or attribution required
- Cannot compile, sell, or sublicense

## Recommended Image Services

If you need more images:
- **Unsplash:** https://unsplash.com - Free high-quality images
- **Pexels:** https://www.pexels.com - Free stock photos
- **Pixabay:** https://pixabay.com - Free stock images
- **Shutterstock:** https://www.shutterstock.com - Premium (Paid)
- **iStock:** https://www.istockphoto.com - Premium (Paid)

---

## Image Upload & Storage

### Current Setup
- **Storage:** Local file system (`/uploads/`)
- **Max Size:** 10MB per file
- **Allowed Types:** JPEG, PNG, GIF, WebP
- **Access:** Via `/uploads/<filename>`

### Production Recommendation
For production, consider using cloud storage:
- **AWS S3:** https://aws.amazon.com/s3/
- **Google Cloud Storage:** https://cloud.google.com/storage
- **Cloudinary:** https://cloudinary.com (Image hosting & optimization)
- **Firebase Storage:** https://firebase.google.com/products/storage

---

## Troubleshooting Images

**Q: Images not showing in frontend?**
- Ensure backend is running (images served from `/uploads/`)
- Check browser console for 404 errors
- Verify image files exist in `/backend/uploads/`

**Q: Unsplash images not loading?**
- Check internet connection
- Verify URL is correct and accessible
- Add width/height parameters to URL for optimization

**Q: Upload images gives error?**
- Check file type (must be JPEG, PNG, GIF, or WebP)
- Verify file size is under 10MB
- Ensure `/backend/uploads/` directory exists

---

## Notes

- Mock data includes real Unsplash image URLs for demonstration
- Images are fetched directly from Unsplash CDN
- You can test image uploads by using your own images
- Consider caching images in production for better performance
