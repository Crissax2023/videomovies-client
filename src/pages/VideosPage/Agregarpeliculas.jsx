import React, { useState } from "react";
//import axios from "axios";
//import { API_URL } from "../../utils/constants";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import "./Agregarpeliculas.css"; // Importa tus estilos CSS aquí
import videosService from "../../services/videos.service";

const initPeliculasForm = {
  title: '',
  year: '',
  director: '',
  duracion: '',
  genero: '',
  url: '',
};

const Agregarpeliculas = () => {
  const [videosStateForm, setVideosStateForm] = useState(initPeliculasForm);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const updateVideoForm = (nameField, value) => {
    setVideosStateForm((prevState) => ({
      ...prevState,
      [nameField]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     // await axios.post(`${API_URL}/api/peliculas`, videosStateForm);
      await videosService.createVideo(videosStateForm)
     setVideosStateForm(initPeliculasForm);
      setSuccess("La película se ha agregado con éxito.");
      setTimeout(() => {
        setSuccess(null);
        navigate('/peliculas');
      }, 2000); // Redireccionar después de 2 segundos
    } catch (error) {
      setError("Error al enviar la solicitud.");
    }
  };

  const cardStyle = {
    minWidth: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    marginTop: '2%', // Separación de la parte superior
    marginLeft: '200px', // Espacio en el lado izquierdo
    marginRight: '200px', // Espacio en el lado derecho
  };

  return (
    <div className="agregar-peliculas-container">
      <form onSubmit={handleSubmit}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div" className="title-style">
              Agregar Pelicula
            </Typography>
            <br />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="title-input">Titulo Pelicula</InputLabel>
                  <OutlinedInput
                    id="title-input"
                    label="Titulo Pelicula"
                    name="title"
                    value={videosStateForm.title}
                    required
                    onChange={(e) => updateVideoForm('title', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="year-input">Año Lanzamiento</InputLabel>
                  <OutlinedInput
                    id="year-input"
                    label="Año Lanzamiento"
                    name="year"
                    type="number"
                    required
                    value={videosStateForm.year}
                    onChange={(e) => updateVideoForm('year', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="director-input">Director</InputLabel>
                  <OutlinedInput
                    id="director-input"
                    label="Director"
                    name="director"
                    required
                    value={videosStateForm.director}
                    onChange={(e) => updateVideoForm('director', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="duracion-input">Duración</InputLabel>
                  <OutlinedInput
                    id="duracion-input"
                    label="Duración"
                    name="duracion"
                    required
                    value={videosStateForm.duracion}
                    onChange={(e) => updateVideoForm('duracion', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="genero-input">Género</InputLabel>
                  <OutlinedInput
                    id="genero-input"
                    label="Género"
                    name="genero"
                    required
                    value={videosStateForm.genero}
                    onChange={(e) => updateVideoForm('genero', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="url-input">Ingresa Url de Imagen</InputLabel>
                  <OutlinedInput
                    id="url-input"
                    label="Ingresa Url de Imagen"
                    name="url"
                    required
                    value={videosStateForm.url}
                    onChange={(e) => updateVideoForm('url', e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end" xs={11.9}>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Agregar
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <br></br>
    </div>
  );
};

export default Agregarpeliculas;

