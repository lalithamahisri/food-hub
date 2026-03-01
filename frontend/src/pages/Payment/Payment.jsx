import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderAPI } from '../../services/api';
import '../Payment/Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (cart.length === 0) {
        return (
            <div className="payment-page">
                <div className="empty-cart-message">
                    <h2>Your cart is empty</h2>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateCard = () => {
        if (paymentMethod !== 'card') return true;

        if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16) {
            setError('Please enter a valid card number');
            return false;
        }
        if (!cardDetails.cardName) {
            setError('Please enter card holder name');
            return false;
        }
        if (!cardDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
            setError('Please enter expiry date (MM/YY)');
            return false;
        }
        if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
            setError('Please enter valid CVV');
            return false;
        }
        return true;
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateCard()) {
            return;
        }

        if (!user) {
            setError('You must be logged in to place an order');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        try {
            setLoading(true);

            // Assume all items in cart are from the same restaurant
            const restaurantId = cart[0].restaurantId;

            const items = cart.map((item) => ({
                foodItemId: item.id,
                quantity: item.quantity,
            }));

            const deliveryAddress = {
                street: location.state?.address || '123 Main St',
                city: 'Your City',
                state: 'Your State',
                zipCode: '000000',
                country: 'India',
                phone: location.state?.phone || '0000000000',
            };

            const response = await orderAPI.create({
                restaurantId,
                items,
                deliveryAddress,
                paymentMethod,
            });

            if (!response.success) {
                throw new Error(response.message || 'Failed to place order');
            }

            const createdOrder = response.data;
            clearCart();
            navigate(`/order-confirmation/${createdOrder._id}`);
        } catch (err) {
            setError(err.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <button className="back-btn" onClick={() => navigate('/cart')}>
                ← Back to Cart
            </button>

            <div className="payment-container">
                <div className="payment-form-section">
                    <h2>Payment Details</h2>

                    <div className="payment-methods">
                        <label className="method-option">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>💳 Credit/Debit Card</span>
                        </label>
                        <label className="method-option">
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === 'upi'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>📱 UPI</span>
                        </label>
                        <label className="method-option">
                            <input
                                type="radio"
                                value="wallet"
                                checked={paymentMethod === 'wallet'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>👛 Digital Wallet</span>
                        </label>
                        <label className="method-option">
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>💵 Cash on Delivery</span>
                        </label>
                    </div>

                    {paymentMethod === 'card' && (
                        <form onSubmit={handlePayment} className="card-form">
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label>Card Holder Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    placeholder="John Doe"
                                    value={cardDetails.cardName}
                                    onChange={handleCardChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date (MM/YY)</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="12/25"
                                        maxLength="5"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardChange}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="123"
                                        maxLength="3"
                                        value={cardDetails.cvv}
                                        onChange={handleCardChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="pay-btn" disabled={loading}>
                                {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                            </button>
                        </form>
                    )}

                    {paymentMethod !== 'card' && (
                        <form onSubmit={handlePayment}>
                            <p className="payment-note">
                                {paymentMethod === 'upi' && 'You will be redirected to UPI payment gateway'}
                                {paymentMethod === 'wallet' && 'You will be redirected to wallet payment'}
                                {paymentMethod === 'cod' && 'You will pay ₹' + total.toFixed(2) + ' at delivery'}
                            </p>
                            <button type="submit" className="pay-btn" disabled={loading}>
                                {loading ? 'Processing...' : `Confirm Payment`}
                            </button>
                        </form>
                    )}
                </div>

                <div className="order-summary-section">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cart.map((item, index) => (
                            <div key={index} className="summary-item">
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-breakdown">
                        <div className="breakdown-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="breakdown-row">
                            <span>Delivery Fee</span>
                            <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="breakdown-row">
                            <span>Tax (8%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="breakdown-row total">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
