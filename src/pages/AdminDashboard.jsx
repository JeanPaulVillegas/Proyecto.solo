import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ orders, users }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = orders.filter(order => 
        new Date(order.date) >= new Date(startDate) && new Date(order.date) <= new Date(endDate)
      );
      setFilteredOrders(filtered);
      const income = filtered.reduce((acc, order) => acc + order.total, 0);
      setTotalIncome(income);
    } else {
      setFilteredOrders(orders);
      const income = orders.reduce((acc, order) => acc + order.total, 0);
      setTotalIncome(income);
    }
  }, [startDate, endDate, orders]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="date-filter">
          <label>Fecha Inicio: 
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>Fecha Fin: 
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{filteredOrders.length}</h3>
          <p>Órdenes del día de hoy</p>
        </div>
        <div className="stat-box">
          <h3>{users.length}</h3>
          <p>Usuarios nuevos</p>
        </div>
        <div className="stat-box">
          <h3>S/ {totalIncome.toFixed(2)}</h3>
          <p>Ingresos de hoy</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
