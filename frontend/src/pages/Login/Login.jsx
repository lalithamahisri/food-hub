import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading: authLoading, error: authError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        (async () => {
            try {
                await login(email, password);
                navigate('/');
            } catch (err) {
                setError(err.message || 'Login failed');
            }
        })();
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>FoodHub</h1>
                        <p>Welcome Back!</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        {(error || authError) && (
                            <div className="error-message">{error || authError}</div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={authLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={authLoading}
                            />
                        </div>

                        <button type="submit" className="login-btn" disabled={authLoading}>
                            {authLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </div>
                </div>

                <div className="login-side">
                    <h2>Order Food Online</h2>
                    <p>Fast delivery from your favorite restaurants</p>
                    <div className="features">
                        <div className="feature">✓ Wide variety of cuisines</div>
                        <div className="feature">✓ Fast delivery</div>
                        <div className="feature">✓ Easy payments</div>
                        <div className="feature">✓ Track your order</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
