import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import '../Orders/Orders.css';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'confirmed';
            case 'preparing':
                return 'preparing';
            case 'out-for-delivery':
                return 'on-the-way';
            case 'delivered':
                return 'delivered';
            default:
                return 'confirmed';
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await orderAPI.getUserOrders();
                if (!response.success) {
                    throw new Error(response.message || 'Failed to load orders');
                }
                setOrders(response.data || []);
            } catch (err) {
                setError(err.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="orders">
                <div className="empty-orders">
                    <h2>Loading your orders...</h2>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders">
                <div className="empty-orders">
                    <h2>No orders yet</h2>
                    <p>Start ordering from your favorite restaurants</p>
                    <button onClick={() => navigate('/')}>Browse Restaurants</button>
                </div>
            </div>
        );
    }

    return (
            <div className="orders">
            <h1>My Orders</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div className="order-id">
                                <h3>Order #{order.orderId}</h3>
                                <span className={`status ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="order-time">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                            <div className="order-items">
                            <h4>Items ({order.items.length})</h4>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.foodItemId}>
                                        {item.name} x{item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                            <div className="order-footer">
                            <div className="order-total">
                                Total: <strong>₹{(order.finalAmount || order.totalAmount).toFixed(2)}</strong>
                            </div>
                            <button
                                className="reorder-btn"
                                onClick={() => navigate('/')}
                            >
                                Order Again
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
