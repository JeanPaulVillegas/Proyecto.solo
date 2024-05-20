import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/UserDetailPage.css';

const UserDetailPage = ({ users, orders }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const foundUser = users.find(user => user.id === id);
    setUser(foundUser);

    const userOrders = orders.filter(order => order.userId === id);
    setUserOrders(userOrders.slice(0, 10));
  }, [id, users, orders]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="user-detail-page">
      <h2>Detalle del Usuario</h2>
      <div className="user-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nombre:</strong> {user.firstName}</p>
        <p><strong>Apellido:</strong> {user.lastName}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Activo:</strong> {user.active ? 'Sí' : 'No'}</p>
      </div>
      <h3>Órdenes del Usuario</h3>
      <ul>
        {userOrders.map(order => (
          <li key={order.id}>
            {order.date} - Total: S/ {order.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailPage;
