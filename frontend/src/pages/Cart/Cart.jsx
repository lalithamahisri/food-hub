import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../Cart/Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart">
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add items from your favorite restaurants</p>
                    <button className="continue-shopping" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const handleCheckout = () => {
        if (cart.length === 0) return;

        navigate('/payment', {
            state: {
                address: '123 Main St, City, State 12345',
                phone: '555-1234'
            }
        });
    };

    // Group items by restaurant
    const itemsByRestaurant = cart.reduce((acc, item) => {
        const restaurantId = item.restaurantId;
        if (!acc[restaurantId]) {
            acc[restaurantId] = [];
        }
        acc[restaurantId].push(item);
        return acc;
    }, {});

    return (
        <div className="cart">
            <h1>Your Cart</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {Object.entries(itemsByRestaurant).map(([restaurantId, items]) => (
                        <div key={restaurantId} className="restaurant-section">
                            <h3>{items[0].restaurantName || 'Restaurant'}</h3>
                            <div className="items-list">
                                {items.map((item) => (
                                    <div key={`${item.id}-${restaurantId}`} className="cart-item">
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p className="price">₹{item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="item-quantity">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.restaurantId, item.quantity - 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.restaurantId, item.quantity + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="item-total">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id, item.restaurantId)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                    <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal:</span>
                            <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery Fee:</span>
                            <span>₹2.99</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax:</span>
                            <span>₹{(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total:</span>
                            <span>₹{(getCartTotal() + 2.99 + getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                    <button
                        className="continue-shopping-btn"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
