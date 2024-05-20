import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import OrderCompletePage from './pages/OrderCompletePage';
import OrderDetailPage from './pages/OrderDetailPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminUserDetail from './pages/AdminUserDetail';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import AdminSeries from './pages/AdminSeries';
import AdminSeriesDetail from './pages/AdminSeriesDetail';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [savedForLater, setSavedForLater] = useState(JSON.parse(localStorage.getItem('savedForLater')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [adminUsers, setAdminUsers] = useState(JSON.parse(localStorage.getItem('adminUsers')) || []);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchedProducts = require('./data/products.json').products;
    setProducts(fetchedProducts);

    // Inicializar credenciales de administrador si no existen
    const adminCreds = [
      { email: 'admin@example.com', password: 'admin123', role: 'admin' }
    ];
    if (!localStorage.getItem('adminUsers')) {
      localStorage.setItem('adminUsers', JSON.stringify(adminCreds));
      setAdminUsers(adminCreds);
    }

    // Inicializar usuarios si no existen
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        { email: 'user1@example.com', password: 'user123', role: 'user' },
        { email: 'user2@example.com', password: 'user123', role: 'user' }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }

    // Inicializar series si no existen
    const initialSeries = [
      { id: 1, name: 'Serie 1', description: 'Descripción de la serie 1' },
      { id: 2, name: 'Serie 2', description: 'Descripción de la serie 2' }
    ];
    if (!localStorage.getItem('series')) {
      localStorage.setItem('series', JSON.stringify(initialSeries));
      setSeries(initialSeries);
    } else {
      setSeries(JSON.parse(localStorage.getItem('series')));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('series', JSON.stringify(series));
  }, [series]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = orders.map(order => {
      if (!order.user) {
        order.user = { firstName: 'N/A', lastName: 'N/A' }; // Establece valores predeterminados si el usuario no está definido
      }
      return order;
    });
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  }, []);
  

  const handleCompleteOrder = (newOrder) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const orderWithUser = {
      ...newOrder,
      user: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
    setOrders([...orders, orderWithUser]);
    setCartItems([]);
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password) ||
                 adminUsers.find(a => a.email === email && a.password === password);
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { role: user.role };
    } else {
      return { error: 'Email o contraseña incorrectos' };
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  };
  const handleDeactivate = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };
  
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/searchresults" element={<SearchResultsPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailsPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} savedForLater={savedForLater} setCartItems={setCartItems} setSavedForLater={setSavedForLater} isLoggedIn={isLoggedIn} />} />
            <Route path="/checkout" element={isLoggedIn ? <CheckoutPage cartItems={cartItems} handleCompleteOrder={handleCompleteOrder} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage handleRegister={handleRegister} />} />
            <Route path="/user" element={<UserPage orders={orders} setOrders={setOrders} />} />
            <Route path="/order/:id" element={<OrderDetailPage orders={orders} setOrders={setOrders} />} />
            <Route path="/order-complete" element={<OrderCompletePage />} />
            <Route path="/user/password" element={<ChangePasswordPage />} />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard orders={orders} users={users} />} />
              <Route path="orders" element={<AdminOrders orders={orders} />} />
              <Route path="order/:orderId" element={<AdminOrderDetail orders={orders} setOrders={setOrders} />} />
              <Route path="users" element={<AdminUsers users={users} setUsers={setUsers} />} />
              <Route path="user/:userEmail" element={<AdminUserDetail users={users} orders={orders} />} />
              <Route path="series" element={<AdminSeries series={series} />} />
              <Route path="series/:seriesId" element={<AdminSeriesDetail series={series} />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
