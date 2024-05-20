import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = ({ products }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="search-results-page">
      <h2>Resultados de Búsqueda</h2>
      <div className="sort-by">
        <label htmlFor="sort">Ordenar Por:</label>
        <select id="sort">
          <option value="price">Precio</option>
          <option value="name">Nombre</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Por: {product.brand}</p>
              <p>S/ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
