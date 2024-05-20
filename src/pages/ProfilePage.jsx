import React, { useState } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const [userDetails, setUserDetails] = useState(storedUsers[0] || {
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[0] = userDetails; // Asumimos que solo hay un usuario en este ejemplo
    localStorage.setItem('users', JSON.stringify(users));
    alert('Información actualizada con éxito');
  };

  return (
    <div className="profile-page">
      <h2>Datos de Registro</h2>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={userDetails.email}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
};

export default ProfilePage;
