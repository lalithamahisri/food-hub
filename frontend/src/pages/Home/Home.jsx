import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../../services/api';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import '../Home/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await restaurantAPI.getAll();
        if (response.success) {
          const backendList = response.data || [];
          setRestaurants(backendList);
        } else {
          setError('Failed to load restaurants');
        }
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Unable to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Get unique cuisines from restaurants
  // Build cuisine list tolerant of backend or mock data shapes
  const cuisineList = restaurants
    .map((r) => {
      if (Array.isArray(r.cuisineType)) return r.cuisineType;
      if (typeof r.cuisine === 'string' && r.cuisine.includes(',')) return r.cuisine.split(',').map(s => s.trim());
      return r.cuisineType ? [r.cuisineType] : r.cuisine ? [r.cuisine] : [];
    })
    .flat();
  const cuisines = ['All', ...new Set(cuisineList)];

  // Filter restaurants based on search and cuisine
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = (restaurant.name || '').toLowerCase();
    const desc = (restaurant.description || '').toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());

    const restaurantCuisines = Array.isArray(restaurant.cuisineType)
      ? restaurant.cuisineType
      : (restaurant.cuisine || '').split(',').map(s => s.trim()).filter(Boolean);

    const matchesCuisine = selectedCuisine === 'All' || restaurantCuisines.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Order Food Online</h1>
          <p>Fast delivery from your favorite restaurants</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fee',
          color: '#c00',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <strong>⚠️ {error}</strong>
          <p>Try: npm run seed && npm run dev (from backend folder)</p>
        </div>
      )}

      {/* Cuisine Filter */}
      {!loading && cuisines.length > 1 && (
        <div className="cuisine-filter">
          <h3>Filter by Cuisine</h3>
          <div className="cuisine-buttons">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                className={`cuisine-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="restaurants-section">
          <h2>Popular Restaurants</h2>
          <p style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
            Loading restaurants... 🍕
          </p>
        </div>
      )}

      {/* Restaurants Grid */}
      {!loading && (
        <div className="restaurants-section">
          <h2>Popular Restaurants</h2>
          {filteredRestaurants.length > 0 ? (
            <div className="restaurants-grid">
              {filteredRestaurants.map((restaurant) => {
                const rid = restaurant._id || restaurant.id;
                return (
                  <RestaurantCard
                    key={rid}
                    restaurant={restaurant}
                    onClick={() => navigate(`/restaurant/${rid}`)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="no-results">
              <p>No restaurants found. Try a different search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
