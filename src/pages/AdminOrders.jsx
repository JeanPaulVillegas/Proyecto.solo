import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminOrders = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredOrders(
      orders.filter(order =>
        order.id.toString().includes(term) ||
        (order.user && (
          order.user.firstName.toLowerCase().includes(term) ||
          order.user.lastName.toLowerCase().includes(term)
        ))
      )
    );
  }, [searchTerm, orders]);

  return (
    <div>
      <h2>Listado de Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar por ID, nombre o apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID de Orden</th>
            <th>Nombre Apellido</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A'}</td>
              <td>S/ {order.total.toFixed(2)}</td>
              <td>
                <Link to={`/admin/order/${order.id}`}>Ver Detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
