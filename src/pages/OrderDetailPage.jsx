import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/OrderDetailPage.css';

const OrderDetailPage = ({ orders, setOrders }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = orders.find(order => order.id === parseInt(id));

  if (!order) {
    return <p>Pedido no encontrado</p>;
  }

  const handleCancelOrder = () => {
    const updatedOrders = orders.filter(order => order.id !== parseInt(id));
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    navigate('/user/orders');
  };

  return (
    <div className="order-detail-page">
      <h2>Detalles de Orden Nro {order.id}</h2>
      <div className="order-detail">
        <div>
          <h3>Dirección de Envío</h3>
          <p>{order.address}</p>
        </div>
        <div>
          <h3>Pago</h3>
          <p>{order.paymentMethod === 'creditCard' ? 'Pago con tarjeta de crédito' : 'Pago con código QR'}</p>
        </div>
        <div>
          <h3>Método de Envío</h3>
          <p>{order.shipping === 10.00 ? 'Económico Aéreo - S/10.00' : 'Envío prioritario (5 a 10 días) - S/17.00'}</p>
        </div>
        <div>
          <h3>Items en Pedido:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.quantity}x {item.name} - S/ {item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div className="order-summary">
          <h3>Resumen de Orden</h3>
          <p>Subtotal: S/ {order.subtotal.toFixed(2)}</p>
          <p>Envío: S/ {order.shipping.toFixed(2)}</p>
          <p>Impuestos: S/ {order.tax.toFixed(2)}</p>
          <p>Total: S/ {order.total.toFixed(2)}</p>
        </div>
        <button onClick={handleCancelOrder}>Cancelar Pedido</button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
