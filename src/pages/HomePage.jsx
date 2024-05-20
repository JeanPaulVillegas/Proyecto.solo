import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import '../styles/HomePage.css'; // Asegúrate de importar el CSS

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchresults?query=${searchQuery}`);
    }
  };

  return (
    <div className="home-page">
      <form className="search-bar-container" onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca productos por nombre..."
          />
          <button type="submit">Buscar</button>
        </div>
      </form>
      <h1 className="title">Colección de Items</h1>
      <div className="product-grid">
        {productsData.products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-brand">{product.brand}</p>
              <p className="product-series">{product.series}</p>
              <p className="product-price">S/ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
