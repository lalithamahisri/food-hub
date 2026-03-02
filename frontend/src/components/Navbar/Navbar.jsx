import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.svg';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const { user, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <img src={logoImg} alt="FoodHub Logo" style={{ height: 'auto', width: '150px' }} />
                    {/*<span className="logo-text">FoodHub</span>*/}
                </Link>

                <div className="nav-links">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/orders"
                        className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
                    >
                        Orders
                    </Link>
                    <Link
                        to="/cart"
                        className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
                    >
                        🛒 Cart
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <Link
                        to="/profile"
                        className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                    >
                        {user?.firstName ? `Hi, ${user.firstName}` : 'Profile'}
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;