import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Payment from './pages/Payment/Payment'
import Profile from './pages/Profile/Profile'
import './App.css'

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/restaurant/:restaurantId" element={<PrivateRoute element={<RestaurantDetail />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
        <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
        <Route path="/order-confirmation/:orderId" element={<PrivateRoute element={<OrderConfirmation />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
