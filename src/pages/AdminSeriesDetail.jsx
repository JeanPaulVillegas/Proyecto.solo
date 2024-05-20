import React from 'react';
import { useParams, Link } from 'react-router-dom';

const AdminSeriesDetail = ({ series }) => {
  const { seriesId } = useParams();
  const serie = series.find(serie => serie.id === seriesId);

  if (!serie) return <p>Serie no encontrada</p>;

  return (
    <div>
      <h2>Detalles de la Serie {serie.name}</h2>
      <p>ID: {serie.id}</p>
      <p>Nombre: {serie.name}</p>
      <p>Descripción: {serie.description}</p>
      <Link to="/admin/series">Volver al Listado de Series</Link>
    </div>
  );
};

export default AdminSeriesDetail;
