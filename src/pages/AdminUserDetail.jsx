import React from 'react';
import { useParams, Link } from 'react-router-dom';

const AdminUserDetail = ({ users, orders }) => {
  const { userId } = useParams();
  const user = users.find(user => user.id.toString() === userId);
  const userOrders = orders.filter(order => order.userId === userId);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div>
      <h2>Detalle de Usuario Registrado</h2>
      <p>ID: {user.id}</p>
      <p>Nombre: {user.firstName} {user.lastName}</p>
      <p>Correo: {user.email}</p>
      <p>Fecha de Registro: {user.registrationDate}</p>
      <h3>Órdenes recientes (máximo 10)</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Orden</th>
            <th>Total</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.slice(0, 10).map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>S/ {order.total.toFixed(2)}</td>
              <td>{order.items.length}</td>
              <td>{order.status}</td>
              <td><Link to={`/order/${order.id}`}>Ver</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserDetail;
