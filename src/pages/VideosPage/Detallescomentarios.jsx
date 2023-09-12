// Detallespeliculas.jsx
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize'; // Importar el componente TextareaAutosize
import Button from '@mui/material/Button';

const Detallespeliculas = () => {
  // Supongamos que tienes información de la película en un objeto.
  const peliculaInfo = {
    title: 'Título de la Película',
    director: 'Director de la Película',
    year: 'Año de Lanzamiento',
    genero: 'Género de la Película',
    duracion: 'Duración de la Película',
    url: 'https://hips.hearstapps.com/hmg-prod/images/terrifier-copia-1666710134.jpg?crop=1xw:0.8458646616541353xh;center,top&resize=1200:*',
  };

  // Estado para almacenar comentarios
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  // Función para manejar cambios en el campo de comentario
  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  // Función para agregar un comentario
  const agregarComentario = () => {
    if (comentario.trim() !== '') {
      setComentarios([...comentarios, comentario]);
      setComentario('');
    }
  };

  return (
    <div style={{ margin: '2% 10% 0' }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* Lado izquierdo: Imagen de la Película */}
            <Grid item xs={12} sm={6}>
              <img src={peliculaInfo.url} alt={peliculaInfo.title} style={{ maxWidth: '80%', maxHeight: '80%' }} />
            </Grid>

            {/* Lado derecho: Información de la Película */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom>
                {peliculaInfo.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Director: {peliculaInfo.director}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Año: {peliculaInfo.year}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Género: {peliculaInfo.genero}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Duración: {peliculaInfo.duracion}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Card para Comentarios */}
      <Card style={{ marginTop: '20px' , backgroundColor: 'transparent'}}>
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ color: 'blue' }}>
            Comentarios
          </Typography>
          {comentarios.map((comentario, index) => (
            <Typography key={index} variant="body2" color="textSecondary">
              {comentario}
            </Typography>
          ))}
          <TextareaAutosize
            minRows={3} // Establecer el número mínimo de filas
            placeholder="Añadir Comentario"
            value={comentario}
            onChange={handleComentarioChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={agregarComentario}
          >
            Agregar Comentario
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detallespeliculas;