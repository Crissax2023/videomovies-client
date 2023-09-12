import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="contenedor">
      <div className="centrar">
        <h1 className="titulo">Inicio</h1>
        <h2 className="subtitulo">Peliculas App</h2>
        <p className="descripcion">El mejor lugar para encontrar tus recomendaciones de películas</p>
      </div>
      <div className="moving-div"></div>
      <div className="moving-div2"></div>
    </div>
  );
}

export default HomePage;

