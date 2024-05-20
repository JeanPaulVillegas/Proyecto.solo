import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserListPage.css';

const UserListPage = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeactivateUser = (id) => {
    const updatedUsers = users.map(user => user.id === id ? { ...user, active: false } : user);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  );

  return (
    <div className="user-list-page">
      <h2>Lista de Usuarios Registrados</h2>
      <input
        type="text"
        placeholder="Buscar por ID, Nombre o Apellido"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeactivateUser(user.id)} disabled={!user.active}>
                  {user.active ? 'Desactivar' : 'Desactivado'}
                </button>
                <Link to={`/admin/user/${user.id}`}>Ver Detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
