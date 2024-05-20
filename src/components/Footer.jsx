import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>LA TIENDITA DEL ABUELO</h3>
          <p>© 2010 — 2020</p>
          <p><Link to="/privacy">Privacy</Link> — <Link to="/terms">Terms</Link></p>
        </div>
        <div className="footer-section">
          <h4>Cuenta</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Productos</h4>
          <ul>
            <li><Link to="/search?filter=best-sellers">Más Vendidos</Link></li>
            <li><Link to="/search?filter=new-arrivals">Nuevos</Link></li>
            <li><Link to="/search?filter=offers">Ofertas</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/about">Acerca de Nosotros</Link></li>
            <li><Link to="/shipping-policy">Política de Envío</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <a href="https://www.facebook.com"><FaFacebook /></a>
          <a href="https://www.instagram.com"><FaInstagram /></a>
          <a href="https://www.twitter.com"><FaTwitter /></a>
          <a href="https://www.youtube.com"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
