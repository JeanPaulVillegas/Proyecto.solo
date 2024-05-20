import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">Usuarios registrados</Link></li>
            <li><Link to="/admin/orders">Órdenes</Link></li>
            <li><Link to="/admin/products">Productos</Link></li>
            <li><Link to="/admin/bestsellers">Productos más vendidos</Link></li>
            <li><Link to="/admin/series">Series</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
