import React, { useState } from 'react';
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[0]; // Asumimos que solo hay un usuario en este ejemplo

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden');
      return;
    }

    if (passwords.currentPassword !== user.password) {
      setError('La contraseña actual es incorrecta');
      return;
    }

    user.password = passwords.newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Contraseña actualizada con éxito');
  };

  return (
    <div className="change-password-page">
      <h2>Cambiar Password</h2>
      <form>
        <input
          type="password"
          name="currentPassword"
          placeholder="Contraseña Actual"
          value={passwords.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nueva Contraseña"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirmar Nueva Contraseña"
          value={passwords.confirmNewPassword}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
