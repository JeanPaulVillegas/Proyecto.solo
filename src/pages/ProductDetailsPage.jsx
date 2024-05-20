import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailsPage.css';

const ProductDetailsPage = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: S/ {product.price}</p>
        <div className="product-quantity">
          <label htmlFor="quantity">Cantidad:</label>
          <input 
            type="number" 
            id="quantity" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))} 
          />
        </div>
        <button onClick={handleAddToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
