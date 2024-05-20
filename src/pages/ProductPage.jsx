// src/pages/ProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductPage = () => {
  const { id } = useParams();
  const product = productsData.products.find((product) => product.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <header>
        <h1>{product.name}</h1>
      </header>
      <div>
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p>Por: {product.brand} - Serie: {product.series}</p>
          <p>S/{product.price}</p>
          <button>Añadir al carrito</button>
        </div>
      </div>
      <div>
        <h3>Descripción</h3>
        <p>{product.description}</p>
      </div>
      <div>
        <h3>Características del Producto:</h3>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
