import React from 'react';
import { useCart } from '../../context/CartContext';
import './FoodCard.css';

const FALLBACK_FOOD_IMAGE =
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80';

const getFoodFallbackImage = (item) => {
    const name = (item.name || '').toLowerCase();
    const category = String(item.category || '').toLowerCase();

    if (name.includes('pizza')) {
        return 'https://images.unsplash.com/photo-1548365328-9daaf8b1a7af?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('burger')) {
        return 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('biryani')) {
        return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('sushi') || category.includes('sushi')) {
        return 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('taco') || category.includes('taco')) {
        return 'https://images.unsplash.com/photo-1601924582971-d854fd8d78b4?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('momo')) {
        return 'https://images.unsplash.com/photo-1590649815076-04996a1eb3b4?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('waffle')) {
        return 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('gelato') || name.includes('ice cream')) {
        return 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80';
    }

    return FALLBACK_FOOD_IMAGE;
};

const FoodCard = ({ item, restaurantId }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: item._id || item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            rating: item.rating,
            restaurantId: restaurantId || item.restaurantId,
            restaurantName: item.restaurantName || 'Restaurant'
        });
    };

    return (
        <div className="food-card">
            <div className="food-image">
                <img
                    src={item.image || getFoodFallbackImage(item)}
                    alt={item.name}
                    onError={(e) => {
                        const fallback = getFoodFallbackImage(item);
                        if (e.target.src !== fallback) {
                            e.target.src = fallback;
                        }
                    }}
                />
                <div className="rating">✦ {(item.rating || 4.5).toFixed(1)}</div>
            </div>
            <div className="food-info">
                <h4>{item.name}</h4>
                <p className="description" style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                    {item.description}
                </p>
                <div className="food-footer">
                    <span className="price">₹{item.price.toFixed(2)}</span>
                    <button className="add-btn" onClick={handleAddToCart}>
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
