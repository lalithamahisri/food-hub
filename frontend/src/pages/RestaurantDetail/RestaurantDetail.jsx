import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantAPI, foodAPI } from '../../services/api';
import FoodCard from '../../components/FoodCard/FoodCard';
import '../RestaurantDetail/RestaurantDetail.css';

const FALLBACK_RESTAURANT_IMAGE =
    'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&fit=crop&w=1200&q=80';
const PLACEHOLDER_PREFIX =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3Zn';

const getRestaurantFallbackImage = (restaurant) => {
    const name = (restaurant.name || '').toLowerCase();
    const cuisines = Array.isArray(restaurant.cuisineType)
        ? restaurant.cuisineType.join(',').toLowerCase()
        : String(restaurant.cuisine || '').toLowerCase();

    if (name.includes('pizza') || cuisines.includes('italian')) {
        return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';
    }
    if (name.includes('burger') || cuisines.includes('burger') || cuisines.includes('american')) {
        return 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80';
    }
    if (cuisines.includes('biryani') || cuisines.includes('indian')) {
        return 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80';
    }
    if (cuisines.includes('chinese')) {
        return 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80';
    }
    if (cuisines.includes('japanese') || name.includes('sushi')) {
        return 'https://images.unsplash.com/photo-1553621042-d1c9e1e49043?auto=format&fit=crop&w=1200&q=80';
    }
    if (cuisines.includes('dessert') || cuisines.includes('gelato')) {
        return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';
    }
    if (cuisines.includes('momos') || name.includes('momo')) {
        return 'https://images.unsplash.com/photo-1590649815076-04996a1eb3b4?auto=format&fit=crop&w=1200&q=80';
    }

    return FALLBACK_RESTAURANT_IMAGE;
};

const RestaurantDetail = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                setLoading(true);
                const response = await restaurantAPI.getById(restaurantId);
                console.log(response.data.restaurant);
                if (response.success) {
                    setRestaurant(response.data.restaurant);
                    // Prefer explicit food-by-restaurant endpoint if available
                    const foodResponse = await foodAPI.getByRestaurant(restaurantId);
                    if (foodResponse.success) {
                        setMenuItems(foodResponse.data || []);
                    } else {
                        setMenuItems(response.data.foodItems || []);
                    }
                } else {
                    setError('Restaurant not found');
                }
            } catch (err) {
                console.error('Error fetching restaurant:', err);
                setError('Failed to load restaurant details. Make sure backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [restaurantId]);

    if (loading) {
        return (
            <div className="restaurant-detail">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>Loading restaurant details... 🍽️</h2>
                </div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="restaurant-detail">
                <div className="not-found">
                    <h2>⚠️ {error || 'Restaurant not found'}</h2>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    const cuisineDisplay = Array.isArray(restaurant.cuisineType)
        ? restaurant.cuisineType.join(', ')
        : restaurant.cuisine || 'Restaurant';

    const isPlaceholderImage =
        typeof restaurant.image === 'string' && restaurant.image.startsWith(PLACEHOLDER_PREFIX);

    const imageSrc =
        !restaurant.image || isPlaceholderImage ? getRestaurantFallbackImage(restaurant) : restaurant.image;

    return (
        <div className="restaurant-detail">
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back
            </button>

            {/* Restaurant Header */}
            <div className="restaurant-header">
                <img
                    src={imageSrc}
                    alt={restaurant.name}
                    style={{ width: '100%', height: '300px', objectFit: 'cover', backgroundColor: '#f0f0f0' }}
                    onError={(e) => {
                        if (e.target.src !== FALLBACK_RESTAURANT_IMAGE) {
                            e.target.src = FALLBACK_RESTAURANT_IMAGE;
                        }
                    }}

                />
                <div className="restaurant-info">
                    <h1>{restaurant.name}</h1>
                    <p className="cuisine">{cuisineDisplay}</p>
                    <div className="details">
                        <span> ✦ {(restaurant.rating || 0).toFixed(1)}</span>
                        <span>
                            ⏱️ {typeof restaurant.deliveryTime === 'number'
                                ? `${restaurant.deliveryTime}-${restaurant.deliveryTime + 10} mins`
                                : restaurant.deliveryTime}
                        </span>
                        <span>🚚 ₹{restaurant.deliveryFee?.toFixed ? restaurant.deliveryFee.toFixed(2) : restaurant.deliveryFee}</span>
                    </div>
                    <p className="description">{restaurant.description}</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="menu-section">
                <h2>Menu</h2>
                {menuItems.length > 0 ? (
                    <div className="menu-grid">
                        {menuItems.map((item) => (
                            <FoodCard key={item._id || item.id} item={item} restaurantId={restaurantId} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>No menu items available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;
