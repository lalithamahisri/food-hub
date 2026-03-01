// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios-like fetch wrapper
const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};

// Auth endpoints
export const authAPI = {
    register: (data) => apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    login: (email, password) => apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
    getProfile: () => apiCall('/auth/profile'),
};

// Restaurant endpoints
export const restaurantAPI = {
    getAll: () => apiCall('/restaurants'),
    getById: (id) => apiCall(`/restaurants/${id}`),
};

// Food endpoints
export const foodAPI = {
    getAll: () => apiCall('/food'),
    getByRestaurant: (restaurantId) => apiCall(`/food/restaurant/${restaurantId}`),
    search: (query) => apiCall(`/food/search?query=${query}`),
};

// Order endpoints
export const orderAPI = {
    create: (data) => apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    getUserOrders: () => apiCall('/orders/user/my-orders'),
    getById: (id) => apiCall(`/orders/${id}`),
    updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
    rate: (id, data) => apiCall(`/orders/${id}/rate`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

export default apiCall;
