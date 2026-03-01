import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import '../OrderConfirmation/OrderConfirmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await orderAPI.getById(orderId);
                if (!response.success) {
                    throw new Error(response.message || 'Failed to load order');
                }
                setOrder(response.data);
            } catch (err) {
                setError(err.message || 'Failed to load order');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="order-confirmation">
                <div className="not-found">
                    <h2>Loading order details...</h2>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="order-confirmation">
                <div className="not-found">
                    <h2>{error || 'Order not found'}</h2>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-confirmation">
            <div className="confirmation-card">
                <div className="success-icon">✓</div>
                <h1>Order Confirmed!</h1>
                <p>Thank you for your order</p>

                <div className="order-details">
                    <div className="detail-row">
                        <span className="label">Order ID:</span>
                        <span className="value">{order.orderId}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Status:</span>
                        <span className="value status">{order.status}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Estimated Delivery:</span>
                        <span className="value">
                            {order.estimatedDeliveryTime
                                ? `${order.estimatedDeliveryTime}-${order.estimatedDeliveryTime + 10} mins`
                                : '30-45 minutes'}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Total Amount:</span>
                        <span className="value amount">₹{(order.finalAmount || order.totalAmount).toFixed(2)}</span>
                    </div>
                </div>

                <div className="items-summary">
                    <h3>Items Ordered ({order.items.length})</h3>
                    <div className="items-list">
                        {order.items.map((item) => (
                            <div key={item.foodItemId} className="item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-qty">x{item.quantity}</span>
                                <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="delivery-info">
                    <h3>Delivery Address</h3>
                    <p>
                        {order.deliveryAddress?.street},{' '}
                        {order.deliveryAddress?.city},{' '}
                        {order.deliveryAddress?.state}{' '}
                        {order.deliveryAddress?.zipCode},{' '}
                        {order.deliveryAddress?.country}
                    </p>
                </div>

                <div className="action-buttons">
                    <button className="track-btn" onClick={() => navigate('/orders')}>
                        View All Orders
                    </button>
                    <button className="home-btn" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;

