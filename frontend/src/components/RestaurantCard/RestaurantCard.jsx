import React from 'react';
import './RestaurantCard.css';

const FALLBACK_RESTAURANT_IMAGE =
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80';
const PLACEHOLDER_PREFIX =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3Zn';

const getRestaurantFallbackImage = (restaurant) => {
    const name = (restaurant.name || '').toLowerCase();
    const cuisines = Array.isArray(restaurant.cuisineType)
        ? restaurant.cuisineType.join(',').toLowerCase()
        : String(restaurant.cuisine || '').toLowerCase();

    if (name.includes('pizza') || cuisines.includes('italian')) {
        return 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80';
    }
    if (name.includes('burger') || cuisines.includes('burger') || cuisines.includes('american')) {
        return 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80';
    }
    if (cuisines.includes('biryani') || cuisines.includes('indian')) {
        return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80';
    }
    if (cuisines.includes('chinese')) {
        return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
    }
    if (cuisines.includes('japanese') || name.includes('sushi')) {
        return 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80';
    }
    if (cuisines.includes('dessert') || cuisines.includes('gelato')) {
        return 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80';
    }
    if (cuisines.includes('momos') || name.includes('momo')) {
        return 'https://images.unsplash.com/photo-1590649815076-04996a1eb3b4?auto=format&fit=crop&w=800&q=80';
    }

    return FALLBACK_RESTAURANT_IMAGE;
};

const RestaurantCard = ({ restaurant, onClick }) => {
    // Handle both old and new data structures
    const cuisineDisplay = Array.isArray(restaurant.cuisineType)
        ? restaurant.cuisineType.join(', ')
        : restaurant.cuisine || 'Restaurant';

    const deliveryTimeDisplay = typeof restaurant.deliveryTime === 'number'
        ? `${restaurant.deliveryTime}-${restaurant.deliveryTime + 10} mins`
        : restaurant.deliveryTime;

    const isPlaceholderImage =
        typeof restaurant.image === 'string' && restaurant.image.startsWith(PLACEHOLDER_PREFIX);

    const imageSrc =
        !restaurant.image || isPlaceholderImage ? getRestaurantFallbackImage(restaurant) : restaurant.image;

    return (
        <div className="restaurant-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="restaurant-image">
                <img
                    src={imageSrc}
                    alt={restaurant.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#f0f0f0' }}
                    onError={(e) => {
                        if (e.target.src !== FALLBACK_RESTAURANT_IMAGE) {
                            e.target.src = FALLBACK_RESTAURANT_IMAGE;
                        }
                    }}
                />
                <div className="rating-badge">✦ {restaurant.rating}</div>
            </div>
            <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{cuisineDisplay}</p>
                <p className="description" style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                    {restaurant.description}
                </p>
                <div className="meta-info">
                    <span>🕰️ {deliveryTimeDisplay}</span>
                    <span>🛻 ₹{restaurant.deliveryFee?.toFixed ? restaurant.deliveryFee.toFixed(2) : restaurant.deliveryFee}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
