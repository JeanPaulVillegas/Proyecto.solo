import React from 'react';
import { useParams } from 'react-router-dom';

const AdminOrderDetail = ({ orders }) => {
  const { orderId } = useParams();
  const order = orders.find(order => order.id === orderId);

  if (!order) {
    return <div>Orden no encontrada</div>;
  }

  return (
    <div>
      <h2>Detalle de la Orden</h2>
      <p>ID de la Orden: {order.id}</p>
      <p>Fecha: {order.date}</p>
      <p>Total: S/ {order.total.toFixed(2)}</p>
      <p>Estado: {order.status}</p>
      <h3>Items en el Pedido:</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.quantity}x {item.name} - S/ {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <button>Cancelar Pedido</button>
    </div>
  );
};

export default AdminOrderDetail;
