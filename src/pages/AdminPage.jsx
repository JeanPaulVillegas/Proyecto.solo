import React, { useState, useEffect } from 'react';
import '../styles/AdminPage.css';

const AdminPage = ({ orders, users }) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10));
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, orders, users]);

  const filterData = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = orders.filter(order => {
      const date = new Date(order.date);
      return date >= start && date <= end;
    });

    setFilteredOrders(filtered);
    setTotalIncome(filtered.reduce((sum, order) => sum + order.total, 0));

    const newUsersFiltered = users.filter(user => {
      const date = new Date(user.registeredDate);
      return date >= start && date <= end;
    });

    setNewUsers(newUsersFiltered);
  };

  return (
    <div className="admin-page">
      <h2>Panel de Administración</h2>
      <div className="date-filter">
        <label>Desde:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label>Hasta:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <div className="summary">
        <div className="summary-box">
          <h3>Órdenes</h3>
          <p>{filteredOrders.length}</p>
        </div>
        <div className="summary-box">
          <h3>Nuevos Usuarios</h3>
          <p>{newUsers.length}</p>
        </div>
        <div className="summary-box">
          <h3>Ingresos Totales</h3>
          <p>S/ {totalIncome.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
