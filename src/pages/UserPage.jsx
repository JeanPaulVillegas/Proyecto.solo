import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = ({ orders, setOrders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Número de órdenes por página

  // Obtener las órdenes para la página actual
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-page">
      <aside className="user-menu">
        <h2>Mi Cuenta</h2>
        <ul>
          <li><Link to="/user">Órdenes Recientes</Link></li>
          <li><Link to="/user/profile">Datos de Registro</Link></li>
          <li><Link to="/user/password">Cambiar Password</Link></li>
        </ul>
      </aside>
      <main className="user-orders">
        <h2>Órdenes Recientes</h2>
        <table>
          <thead>
            <tr>
              <th>Órdenes Recientes</th>
              <th>Ordenar por fecha (más antiguas primero)</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index}>
                <td>
                  Orden x{order.items.length} Items ({order.items.map(item => item.name).join(', ')})
                  <br />
                  Fecha: {order.date} - Total: S/ {order.total.toFixed(2)}
                  <br />
                  Enviado a: {order.address}
                </td>
                <td>
                  Orden Nro. {order.id}
                  <Link to={`/order/${order.id}`}>Ver Detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
