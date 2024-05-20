import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminSeries = ({ series }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSeries, setFilteredSeries] = useState(series);

  useEffect(() => {
    setFilteredSeries(
      series.filter(serie =>
        serie.id.includes(searchTerm) ||
        serie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serie.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, series]);

  return (
    <div>
      <h2>Listado de Series</h2>
      <input
        type="text"
        placeholder="Buscar por ID, nombre o descripción"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSeries.map(serie => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.name}</td>
              <td>{serie.description}</td>
              <td>
                <Link to={`/admin/series/${serie.id}`}>Ver Detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/series/new">Registrar Nueva Serie</Link>
    </div>
  );
};

export default AdminSeries;
