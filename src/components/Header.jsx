import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Tienda</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/search?filter=best-sellers">Más vendidos</Link></li>
          <li><Link to="/search?filter=new-arrivals">Nuevos</Link></li>
          <li><Link to="/search?filter=offers">Ofertas</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        <Link to="/cart" className="cart-icon"><FaShoppingCart /></Link>
        <Link to="/help" className="help-link">Ayuda</Link>
        {isLoggedIn ? (
          <>
            <button className="account-button" onClick={handleAccountClick}>Mi Cuenta</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="account-button" onClick={handleAccountClick}>Mi Cuenta</button>
        )}
      </div>
    </header>
  );
};

export default Header;
