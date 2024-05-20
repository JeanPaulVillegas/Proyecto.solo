import React from 'react';
import { Link } from 'react-router-dom';

const OrderCompletePage = () => {
  return (
    <div className="order-complete-container">
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pedido ha sido completado con éxito.</p>
      <Link to="/">Volver a la tienda</Link>
    </div>
  );
};

export default OrderCompletePage;
